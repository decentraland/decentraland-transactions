import { ethers } from 'ethers'
import { Squid } from '@0xsquid/sdk'
import { SquidCallType, ChainType } from '@0xsquid/sdk/dist/types'
import { Provider } from 'decentraland-connect/dist/types'
import { ChainId } from '@dcl/schemas'
import { ERC20 } from '../abis/ERC20'
import { MarketplaceV2 } from '../abis/MarketplaceV2'
import { ERC721 } from '../abis/ERC721'
import { Marketplace } from '../abis/Marketplace'
import { CollectionStore } from '../abis/CollectionStore'
import { getContract } from '../contracts'
import { ContractName } from '../types'
import {
  BuyNFTCrossChainData,
  FromAmountParams,
  MintNFTCrossChainData,
  RouteResponse,
  CrossChainProvider
} from './types'

export class AxelarProvider implements CrossChainProvider {
  public squid: Squid
  public initialized = false
  private squidMulticall = '0x4fd39C9E151e50580779bd04B1f7eCc310079fd3' // Squid calling contract

  constructor(squidURL: string) {
    this.squid = new Squid({
      baseUrl: squidURL,
      integratorId: 'decentraland-sdk'
    })
  }

  async init() {
    if (!this.squid.initialized) {
      await this.squid.init()
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
    const signer = await new ethers.providers.Web3Provider(provider).getSigner()

    // @ts-ignore
    // tslint:disable-next-line
    const txResponse = (await this.squid.executeRoute({
      route: route.route,
      signer
    })) as ethers.providers.TransactionResponse

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

    const destinyChainMANA = getContract(ContractName.MANAToken, toChain)
      .address

    const destinyChainMarketplace = getContract(
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
      toToken: destinyChainMANA,
      toChain: toChain.toString(),
      toAddress: destinyChainMarketplace,
      enableBoost: enableExpress,
      slippageConfig: {
        autoMode: slippage
      },
      postHook: {
        chainType: ChainType.EVM,
        fundAmount: '1',
        fundToken: destinyChainMANA,
        calls: [
          // ===================================
          // Approve MANA to be spent by Decentraland contract
          // ===================================
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.DEFAULT,
            target: destinyChainMANA,
            value: '0',
            callData: ERC20ContractInterface.encodeFunctionData('approve', [
              destinyChainMarketplace,
              toAmount
            ]),
            payload: {
              tokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
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
            target: destinyChainMarketplace,
            value: '0',
            callData: marketplaceInterface.encodeFunctionData('executeOrder', [
              collectionAddress,
              tokenId,
              price
            ]),

            payload: {
              tokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // ex `0x`
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
              [this.squidMulticall, fromAddress, tokenId]
            ),
            payload: {
              tokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
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
            target: destinyChainMANA,
            value: '0',
            callData: ERC20ContractInterface.encodeFunctionData('transfer', [
              fromAddress,
              '0'
            ]),
            payload: {
              tokenAddress: destinyChainMANA,
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

    const destinyChainMANA = getContract(ContractName.MANAToken, toChain)
      .address
    const destinyChaiCollectionStoreAddress = getContract(
      ContractName.CollectionStore,
      toChain
    ).address

    return this.squid.getRoute({
      fromAddress,
      fromAmount,
      fromToken,
      fromChain: fromChain.toString(),
      toToken: destinyChainMANA,
      toChain: toChain.toString(),
      toAddress: fromAddress,
      enableBoost: enableExpress, // TODO: check if we need this
      slippageConfig: {
        autoMode: slippage
      },
      postHook: {
        chainType: ChainType.EVM,
        fundAmount: '1',
        fundToken: destinyChainMANA,
        calls: [
          // ===================================
          // Approve MANA to be spent by Decentraland contract
          // ===================================
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.DEFAULT,
            target: destinyChainMANA,
            value: '0',
            callData: ERC20ContractInterface.encodeFunctionData('approve', [
              getContract(ContractName.CollectionStore, toChain).address,
              toAmount
            ]),
            payload: {
              tokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
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
            target: destinyChaiCollectionStoreAddress,
            value: '0', // @TODO: WHY 0?
            callData: collectionStoreInterface.encodeFunctionData(
              'buy((address,uint256[],uint256[],address[])[])',
              [[[collectionAddress, [itemId], [price], [fromAddress]]]]
            ),

            payload: {
              tokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // TODO: do we need this to be set as the native? it's working like this
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
            target: destinyChainMANA,
            value: '0',
            callData: ERC20ContractInterface.encodeFunctionData('transfer', [
              fromAddress,
              '0'
            ]),
            payload: {
              tokenAddress: destinyChainMANA,
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
}
