import { ethers } from 'ethers'
import { Squid } from '@0xsquid/sdk'
import { SquidCallType, ChainType, ChainCall } from '@0xsquid/sdk/dist/types'
import { Provider } from 'decentraland-connect'
import { ChainId, OnChainTrade } from '@dcl/schemas'
import { OffChainMarketplacePolygon } from '../abis/OffChainMarketplacePolygon'
import { OffChainMarketplaceEthereum } from '../abis/OffChainMarketplaceEthereum'
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

  constructor(squidURL: string) {
    this.squid = new Squid({
      baseUrl: squidURL,
      integratorId: INTEGRATOR_ID
    })
    // tslint:disable-next-line
    this.squid.init()
  }

  static getTxLink(txHash: string) {
    return `https://axelarscan.io/gmp/${txHash}`
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

  async executeRoute(route: RouteResponse, provider: Provider): Promise<any> {
    // Use any to support both v5 and v6 receipt types
    const web3Provider = this._createWeb3Provider(provider)
    const signer = await web3Provider.getSigner()
    if (!this.squid.initialized) {
      await this.init()
    }

    // @ts-ignore squid types mismatch
    let txResponse = await this.squid.executeRoute({
      route: route.route,
      signer
    })

    // @ts-ignore transaction response type mismatch
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
      name
    } = getRegisterNameCrossChainData

    const ERC20ContractInterface = this._createInterface(ERC20)
    const destinationChainMANA = getContract(ContractName.MANAToken, toChain)
      .address
    const controllerContract = getContract(
      ContractName.DCLControllerV2,
      toChain
    )
    const ControllerV2Interface = this._createInterface(DCLControllerV2)

    return this.squid.getRoute({
      fromAddress,
      fromAmount,
      fromToken,
      fromChain: fromChain.toString(),
      toToken: destinationChainMANA,
      toChain: toChain.toString(),
      toAddress: controllerContract.address,
      enableBoost: enableExpress,
      postHook: {
        provider: 'Decentraland',
        description: `Buy ${name}`,
        logoURI:
          'https://cdn.decentraland.org/@dcl/marketplace-site/6.41.1/favicon.ico', // use logo from a mkt previous version
        chainType: ChainType.EVM,
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

  getExecuteOrderCalls({
    destinationChainMANA,
    destinationChainMarketplace,
    toAmount,
    fromAddress,
    collectionAddress,
    tokenId,
    price,
    marketplaceInterface,
    ERC721ContractInterface,
    squidMulticallContract
  }: {
    destinationChainMANA: string
    destinationChainMarketplace: string
    toAmount: string
    fromAddress: string
    collectionAddress: string
    tokenId: string
    price: string
    marketplaceInterface: ethers.utils.Interface
    ERC721ContractInterface: ethers.utils.Interface
    squidMulticallContract: string | undefined
  }): ChainCall[] {
    const ERC20ContractInterface = this._createInterface(ERC20)
    return [
      // Approve MANA to be spent by Decentraland contract
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
      // EXECUTE ORDER
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
      // Transfer NFT to buyer
      {
        chainType: ChainType.EVM,
        callType: SquidCallType.DEFAULT,
        target: collectionAddress,
        value: '0',
        callData: ERC721ContractInterface.encodeFunctionData(
          'safeTransferFrom(address, address, uint256)',
          [squidMulticallContract, fromAddress, tokenId]
        ),
        payload: {
          tokenAddress: NATIVE_TOKEN,
          inputPos: 1
        },
        estimatedGas: '50000'
      },
      // Transfer remaining MANA to buyer
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

  getTradesContractCalls({
    destinationChainMANA,
    destinationChainMarketplace,
    toAmount,
    fromAddress,
    onChainTrade,
    ERC20ContractInterface,
    marketplaceInterface
  }: {
    destinationChainMANA: string
    destinationChainMarketplace: string
    toAmount: string
    fromAddress: string
    onChainTrade: OnChainTrade
    ERC20ContractInterface: ethers.utils.Interface
    marketplaceInterface: ethers.utils.Interface
  }): ChainCall[] {
    return [
      // Approve MANA to be spent by Decentraland contract
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
      // ACCEPT TRADE
      {
        chainType: ChainType.EVM,
        callType: SquidCallType.DEFAULT,
        target: destinationChainMarketplace,
        value: '0',
        callData: marketplaceInterface.encodeFunctionData('accept', [
          onChainTrade
        ]),

        payload: {
          tokenAddress: NATIVE_TOKEN,
          inputPos: 0
        },
        estimatedGas: '300000'
      },
      // Transfer remaining MANA to buyer
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
          // with FULL_TOKEN_BALANCE (instead of "0")
          inputPos: 1
        },
        estimatedGas: '50000'
      }
    ]
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
      order: { contractAddress, tokenId, price, tradeId },
      fetchTradeData
    } = buyNFTCrossChainData

    const collectionAddress = contractAddress
    const ERC20ContractInterface = this._createInterface(ERC20)
    const marketplaceContractABI =
      toChain === ChainId.MATIC_MAINNET
        ? tradeId
          ? OffChainMarketplacePolygon
          : MarketplaceV2
        : tradeId
        ? OffChainMarketplaceEthereum
        : Marketplace

    const marketplaceInterface = this._createInterface(marketplaceContractABI)
    const ERC721ContractInterface = this._createInterface(ERC721)

    const destinationChainMANA = getContract(ContractName.MANAToken, toChain)
      .address

    const destinationChainMarketplace = getContract(
      tradeId
        ? ContractName.OffChainMarketplace
        : toChain === ChainId.MATIC_MAINNET
        ? ContractName.MarketplaceV2
        : ContractName.Marketplace,
      toChain
    ).address

    const squidMulticallContract = this.squid.chains.find(
      c => c.chainId === toChain.toString()
    )?.squidContracts.squidMulticall

    let calls: ChainCall[] = []

    if (tradeId && fetchTradeData) {
      const { onChainTrade } = await fetchTradeData()

      calls = this.getTradesContractCalls({
        destinationChainMANA,
        destinationChainMarketplace,
        toAmount,
        fromAddress,
        onChainTrade,
        ERC20ContractInterface,
        marketplaceInterface
      })
    } else {
      calls = this.getExecuteOrderCalls({
        destinationChainMANA,
        destinationChainMarketplace,
        toAmount,
        fromAddress,
        collectionAddress,
        tokenId,
        price,
        marketplaceInterface,
        ERC721ContractInterface,
        squidMulticallContract
      })
    }

    return this.squid.getRoute({
      fromAddress,
      fromAmount,
      fromToken,
      fromChain: fromChain.toString(),
      toToken: destinationChainMANA,
      toChain: toChain.toString(),
      toAddress: destinationChainMarketplace,
      enableBoost: enableExpress,
      postHook: {
        provider: 'Decentraland',
        description: `Buy NFT ${collectionAddress}-${tokenId}`,
        logoURI:
          'https://cdn.decentraland.org/@dcl/marketplace-site/6.41.1/favicon.ico', // use logo from a mkt previous version
        chainType: ChainType.EVM,
        calls
      }
    })
  }

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
      item: { collectionAddress, price, itemId, tradeId },
      fetchTradeData
    } = buyNFTCrossChainData

    const ERC20ContractInterface = this._createInterface(ERC20)
    const collectionStoreInterface = this._createInterface(CollectionStore)

    const destinationChainMANA = getContract(ContractName.MANAToken, toChain)
      .address

    const marketplaceContractABI =
      toChain === ChainId.MATIC_MAINNET
        ? tradeId
          ? OffChainMarketplacePolygon
          : MarketplaceV2
        : tradeId
        ? OffChainMarketplaceEthereum
        : Marketplace

    const marketplaceInterface = this._createInterface(marketplaceContractABI)

    const destinationChainCollectionStoreAddress = getContract(
      ContractName.CollectionStore,
      toChain
    ).address

    let calls: ChainCall[] = []

    if (tradeId && fetchTradeData) {
      const { onChainTrade } = await fetchTradeData()

      calls = this.getTradesContractCalls({
        destinationChainMANA,
        destinationChainMarketplace: getContract(
          ContractName.CollectionStore,
          toChain
        ).address,
        toAmount,
        fromAddress,
        onChainTrade,
        ERC20ContractInterface,
        marketplaceInterface
      })
    } else {
      calls = this.getMintItemCalls({
        destinationChainMANA,
        destinationChainCollectionStoreAddress,
        toAmount,
        fromAddress,
        collectionAddress,
        itemId,
        price,
        ERC20ContractInterface,
        collectionStoreInterface
      })
    }

    return this.squid.getRoute({
      fromAddress,
      fromAmount,
      fromToken,
      fromChain: fromChain.toString(),
      toToken: destinationChainMANA,
      toChain: toChain.toString(),
      toAddress: fromAddress,
      enableBoost: enableExpress, // TODO: check if we need this
      postHook: {
        provider: 'Decentraland',
        description: `Buy Item ${collectionAddress}-${itemId}`,
        logoURI:
          'https://cdn.decentraland.org/@dcl/marketplace-site/6.41.1/favicon.ico', // use logo from a mkt previous version
        chainType: ChainType.EVM,
        calls
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

  getMintItemCalls({
    destinationChainMANA,
    destinationChainCollectionStoreAddress,
    toAmount,
    fromAddress,
    collectionAddress,
    itemId,
    price,
    ERC20ContractInterface,
    collectionStoreInterface
  }: {
    destinationChainMANA: string
    destinationChainCollectionStoreAddress: string
    toAmount: string
    fromAddress: string
    collectionAddress: string
    itemId: string
    price: string
    ERC20ContractInterface: ethers.utils.Interface
    collectionStoreInterface: ethers.utils.Interface
  }): ChainCall[] {
    return [
      // ===================================
      // Approve MANA to be spent by Decentraland contract
      // ===================================
      {
        chainType: ChainType.EVM,
        callType: SquidCallType.DEFAULT,
        target: destinationChainMANA,
        value: '0',
        callData: ERC20ContractInterface.encodeFunctionData('approve', [
          destinationChainCollectionStoreAddress,
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
        target: destinationChainCollectionStoreAddress,
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
          // with FULL_TOKEN_BALANCE (instead of "0")
          inputPos: 1
        },
        estimatedGas: '50000'
      }
    ]
  }

  // @ts-ignore ethers type mismatch between v5 and v6
  private _createInterface(abi: any) {
    try {
      // Try v6 syntax first since decentraland-connect uses v6
      // @ts-ignore ethers v6 typing
      return ethers.Interface.from(abi)
    } catch (e) {
      try {
        // Fall back to v5 syntax
        // @ts-ignore ethers v5 typing
        return new ethers.utils.Interface(abi)
      } catch (e2) {
        console.error('Failed to create interface:', e2)
        throw e2
      }
    }
  }

  // @ts-ignore ethers type mismatch between v5 and v6
  private _createWeb3Provider(provider: Provider) {
    try {
      // Try v6 syntax
      // @ts-ignore ethers v6 typing
      return new ethers.BrowserProvider(provider)
    } catch (e) {
      try {
        // Fall back to v5 syntax
        // @ts-ignore ethers v5 typing
        return new ethers.providers.Web3Provider(provider)
      } catch (e2) {
        console.error('Failed to create Web3Provider:', e2)
        throw e2
      }
    }
  }
}
