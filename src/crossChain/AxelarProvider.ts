import { ethers } from 'ethers'
import { Squid } from '@0xsquid/sdk'
import { SquidCallType, ChainType } from '@0xsquid/sdk/dist/types'
import { Provider } from 'decentraland-connect'
import { ChainId } from '@dcl/schemas'
import { ERC20 } from '../abis/ERC20'
import { DCLControllerV2 } from '../abis/DCLControllerV2'
import { MarketplaceV2 } from '../abis/MarketplaceV2'
import { ERC721 } from '../abis/ERC721'
import { Marketplace } from '../abis/Marketplace'
import { CollectionStore } from '../abis/CollectionStore'
import { getContract } from '../contracts'
import { ContractName } from '../types'
import { NATIVE_TOKEN } from './utils'
import {
  BuyNFTCrossChainData,
  FromAmountParams,
  MintNFTCrossChainData,
  RouteResponse,
  CrossChainProvider,
  RegisterNameCrossChainData
} from './types'

const INTEGRATOR_ID = 'decentraland-sdk'

export class AxelarProvider implements CrossChainProvider {
  public squid: Squid
  public initialized = false
  private polygonSquidMulticallContract =
    '0xEa749Fd6bA492dbc14c24FE8A3d08769229b896c' // default value, will be overriden in the init method by the latest one gotten from the sdk

  constructor(squidURL: string) {
    this.squid = new Squid({
      baseUrl: squidURL,
      integratorId: INTEGRATOR_ID
    })
    // tslint:disable-next-line
    this.squid.init()
  }

  async init() {
    if (!this.squid.initialized) {
      await this.squid.init()
      const polygonChainData = this.squid.chains.find(
        c => c.chainId === ChainId.MATIC_MAINNET.toString()
      )
      if (polygonChainData?.squidContracts.squidMulticall) {
        this.polygonSquidMulticallContract =
          polygonChainData.squidContracts.squidMulticall
      }
      this.initialized = true
    }
  }

  isLibInitialized() {
    return this.squid.initialized
  }

  async getFromAmount(fromAmountParams: FromAmountParams) {
    return this.squid.getFromAmount(fromAmountParams)
  }

  getSupportedTokens() {
    return this.squid.tokens
  }

  getSupportedChains() {
    return this.squid.chains
  }

  async executeRoute(
    route: RouteResponse,
    provider: Provider
  ): Promise<ethers.providers.TransactionReceipt> {
    const signer = new ethers.providers.Web3Provider(provider).getSigner()
    if (!this.squid.initialized) {
      await this.init()
    }

    // @ts-ignore
    // tslint:disable-next-line
    let txResponse: ethers.providers.TransactionResponse | null = (await this.squid.executeRoute(
      {
        route: route.route,
        signer
      }
    )) as ethers.providers.TransactionResponse

    return txResponse.wait()
  }

  async buyNFT(
    provider: Provider,
    buyNFTCrossChainData: BuyNFTCrossChainData
  ): Promise<string> {
    const route = await this.getBuyNFTRoute(buyNFTCrossChainData)
    const tx = await this.executeRoute(route, provider)
    return tx.transactionHash
  }

  async getRegisterNameRoute(
    getRegisterNameCrossChainData: RegisterNameCrossChainData
  ): Promise<RouteResponse> {
    if (!this.squid.initialized) {
      await this.init()
    }
    const {
      fromAddress,
      fromAmount,
      fromChain,
      fromToken,
      toChain,
      toAmount, // the registration price
      enableExpress = true,
      slippage = 1, // 1 is "normal" slippage. Always set to 1
      name
    } = getRegisterNameCrossChainData

    const ERC20ContractInterface = new ethers.utils.Interface(ERC20)
    const destinationChainMANA = getContract(ContractName.MANAToken, toChain)
      .address
    const controllerContract = getContract(
      ContractName.DCLControllerV2,
      toChain
    )
    const ControllerV2Interface = new ethers.utils.Interface(DCLControllerV2)

    return this.squid.getRoute({
      fromAddress,
      fromAmount,
      fromToken,
      fromChain: fromChain.toString(),
      toToken: destinationChainMANA,
      toChain: toChain.toString(),
      toAddress: controllerContract.address,
      enableBoost: enableExpress,
      slippageConfig: {
        autoMode: slippage
      },
      postHook: {
        description: '',
        chainType: ChainType.EVM,
        fundAmount: '1',
        fundToken: destinationChainMANA,
        calls: [
          // ===================================
          // Approve MANA to be spent by Decentraland contract
          // ===================================
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.DEFAULT,
            target: destinationChainMANA,
            value: '0',
            callData: ERC20ContractInterface.encodeFunctionData('approve', [
              controllerContract.address,
              toAmount
            ]),
            payload: {
              tokenAddress: NATIVE_TOKEN,
              inputPos: 0
            },
            estimatedGas: '50000'
          },
          // ===================================
          // Register name using the Controller V2 contract
          // ===================================
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.DEFAULT,
            target: controllerContract.address,
            value: '0',
            callData: ControllerV2Interface.encodeFunctionData('register', [
              name,
              fromAddress
            ]),
            payload: {
              tokenAddress: NATIVE_TOKEN,
              inputPos: 0
            },
            estimatedGas: '50000'
          },
          // ===================================
          // Transfer remaining MANA to registerer
          // ===================================
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.FULL_TOKEN_BALANCE,
            target: destinationChainMANA,
            value: '0',
            callData: ERC20ContractInterface.encodeFunctionData('transfer', [
              fromAddress,
              '0'
            ]),
            payload: {
              tokenAddress: destinationChainMANA,
              // This will replace the parameter at index 1 in the encoded Function,
              //  with FULL_TOKEN_BALANCE (instead of "0")
              inputPos: 1
            },
            estimatedGas: '50000'
          }
        ]
      }
    })
  }

  async getBuyNFTRoute(
    buyNFTCrossChainData: BuyNFTCrossChainData
  ): Promise<RouteResponse> {
    if (!this.squid.initialized) {
      await this.init()
    }
    const {
      fromAddress,
      fromAmount,
      fromChain,
      fromToken,
      toChain,
      toAmount, // the item price
      enableExpress = true, // TODO: check if we need this
      slippage = 1, // 1 is "normal" slippage. Always set to 1
      nft: { collectionAddress, price, tokenId }
    } = buyNFTCrossChainData

    const ERC20ContractInterface = new ethers.utils.Interface(ERC20)
    const marketplaceContractABI =
      toChain === ChainId.MATIC_MAINNET ? MarketplaceV2 : Marketplace

    const marketplaceInterface = new ethers.utils.Interface(
      marketplaceContractABI
    )
    const ERC721ContractInterface = new ethers.utils.Interface(ERC721)

    const destinationChainMANA = getContract(ContractName.MANAToken, toChain)
      .address

    const destinationChainMarketplace = getContract(
      toChain === ChainId.MATIC_MAINNET
        ? ContractName.MarketplaceV2
        : ContractName.Marketplace,
      toChain
    ).address

    return this.squid.getRoute({
      fromAddress,
      fromAmount,
      fromToken,
      fromChain: fromChain.toString(),
      toToken: destinationChainMANA,
      toChain: toChain.toString(),
      toAddress: destinationChainMarketplace,
      enableBoost: enableExpress,
      slippageConfig: {
        autoMode: slippage
      },
      postHook: {
        description: '',
        chainType: ChainType.EVM,
        fundAmount: '1',
        fundToken: destinationChainMANA,
        calls: [
          // ===================================
          // Approve MANA to be spent by Decentraland contract
          // ===================================
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.DEFAULT,
            target: destinationChainMANA,
            value: '0',
            callData: ERC20ContractInterface.encodeFunctionData('approve', [
              destinationChainMarketplace,
              toAmount
            ]),
            payload: {
              tokenAddress: NATIVE_TOKEN,
              inputPos: 0
            },
            estimatedGas: '50000'
          },
          // ===================================
          // EXECUTE ORDER
          // ===================================
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.DEFAULT,
            target: destinationChainMarketplace,
            value: '0',
            callData: marketplaceInterface.encodeFunctionData('executeOrder', [
              collectionAddress,
              tokenId,
              price
            ]),

            payload: {
              tokenAddress: NATIVE_TOKEN, // ex `0x`
              inputPos: 0
            },
            estimatedGas: '300000'
          },
          // ===================================
          // Transfer NFT to buyer
          // ===================================
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.DEFAULT,
            target: collectionAddress,
            value: '0',
            callData: ERC721ContractInterface.encodeFunctionData(
              'safeTransferFrom(address, address, uint256)',
              [this.polygonSquidMulticallContract, fromAddress, tokenId]
            ),
            payload: {
              tokenAddress: NATIVE_TOKEN,
              inputPos: 1
            },
            estimatedGas: '50000'
          },
          // ===================================
          // Transfer remaining MANA to buyer
          // ===================================
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.FULL_TOKEN_BALANCE,
            target: destinationChainMANA,
            value: '0',
            callData: ERC20ContractInterface.encodeFunctionData('transfer', [
              fromAddress,
              '0'
            ]),
            payload: {
              tokenAddress: destinationChainMANA,
              // This will replace the parameter at index 1 in the encoded Function,
              //  with FULL_TOKEN_BALANCE (instead of "0")
              inputPos: 1
            },
            estimatedGas: '50000'
          }
        ]
      }
    })
  }

  // MINT
  async mintNFT(
    provider: Provider,
    mintNFTCrossChainData: MintNFTCrossChainData
  ): Promise<string> {
    const route = await this.getMintNFTRoute(mintNFTCrossChainData)
    const tx = await this.executeRoute(route, provider)
    return tx.transactionHash
  }

  async getMintNFTRoute(
    buyNFTCrossChainData: MintNFTCrossChainData
  ): Promise<RouteResponse> {
    if (!this.squid.initialized) {
      await this.init()
    }
    const {
      fromAddress,
      fromAmount,
      fromChain,
      fromToken,
      toChain,
      toAmount, // the item price
      enableExpress = true,
      slippage = 1, // 1 is "normal" slippage. Always set to 1
      item: { collectionAddress, price, itemId }
    } = buyNFTCrossChainData

    const ERC20ContractInterface = new ethers.utils.Interface(ERC20)
    const collectionStoreInterface = new ethers.utils.Interface(CollectionStore)

    const destinationChainMANA = getContract(ContractName.MANAToken, toChain)
      .address
    const destinationChaiCollectionStoreAddress = getContract(
      ContractName.CollectionStore,
      toChain
    ).address

    return this.squid.getRoute({
      fromAddress,
      fromAmount,
      fromToken,
      fromChain: fromChain.toString(),
      toToken: destinationChainMANA,
      toChain: toChain.toString(),
      toAddress: fromAddress,
      enableBoost: enableExpress, // TODO: check if we need this
      slippageConfig: {
        autoMode: slippage
      },
      postHook: {
        description: '',
        chainType: ChainType.EVM,
        fundAmount: '1',
        fundToken: destinationChainMANA,
        calls: [
          // ===================================
          // Approve MANA to be spent by Decentraland contract
          // ===================================
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.DEFAULT,
            target: destinationChainMANA,
            value: '0',
            callData: ERC20ContractInterface.encodeFunctionData('approve', [
              getContract(ContractName.CollectionStore, toChain).address,
              toAmount
            ]),
            payload: {
              tokenAddress: NATIVE_TOKEN,
              inputPos: 0
            },
            estimatedGas: '50000'
          },
          // ===================================
          // BUY ITEM
          // ===================================
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.DEFAULT,
            target: destinationChaiCollectionStoreAddress,
            value: '0', // @TODO: WHY 0?
            callData: collectionStoreInterface.encodeFunctionData(
              'buy((address,uint256[],uint256[],address[])[])',
              [[[collectionAddress, [itemId], [price], [fromAddress]]]]
            ),

            payload: {
              tokenAddress: NATIVE_TOKEN, // TODO: do we need this to be set as the native? it's working like this
              inputPos: 0
            },
            estimatedGas: '300000' // TODO: where do we get this value from?
          },
          // ===================================
          // Transfer remaining MANA to buyer
          // ===================================
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.FULL_TOKEN_BALANCE,
            target: destinationChainMANA,
            value: '0',
            callData: ERC20ContractInterface.encodeFunctionData('transfer', [
              fromAddress,
              '0'
            ]),
            payload: {
              tokenAddress: destinationChainMANA,
              // This will replace the parameter at index 1 in the encoded Function,
              //  with FULL_TOKEN_BALANCE (instead of "0")
              inputPos: 1
            },
            estimatedGas: '50000'
          }
        ]
      }
    })
  }

  async getStatus(routeRequestId: string, originChainTxHash: string) {
    return this.squid.getStatus({
      transactionId: originChainTxHash,
      integratorId: INTEGRATOR_ID,
      requestId: routeRequestId
    })
  }

  static getTxLink(txHash: string) {
    return `https://axelarscan.io/gmp/${txHash}`
  }
}
