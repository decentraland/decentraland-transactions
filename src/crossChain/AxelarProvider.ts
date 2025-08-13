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
  RegisterNameCrossChainData,
  RegisterNameWithCreditsData,
  CreditsManagerRouteResponse
} from './types'

const INTEGRATOR_ID = 'decentraland-sdk-coral-test'
console.log('INTEGRATOR_ID', INTEGRATOR_ID)

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

  async getRegisterNameWithCreditsRoute(
    registerNameWithCreditsData: RegisterNameWithCreditsData
  ): Promise<CreditsManagerRouteResponse> {
    if (!this.squid.initialized) {
      await this.init()
    }

    const {
      fromAddress,
      fromAmount,
      fromChain, // Polygon
      toChain,   // Ethereum
      enableExpress = true,
      name,
      credits,
      creditsSignatures,
      externalCallSignature
      // maxUncreditedValue and maxCreditedValue not used with CreditExecutor
    } = registerNameWithCreditsData

    const ControllerV2Interface = new ethers.utils.Interface(DCLControllerV2)

    // Contracts on their respective chains
    const polygonMANA = getContract(ContractName.MANAToken, fromChain).address // Polygon MANA
    const ethereumMANA = getContract(ContractName.MANAToken, toChain).address  // Ethereum MANA
    const creditsManagerPolygon = getContract(ContractName.CreditsManager, fromChain) // Polygon
    const controllerEthereum = getContract(ContractName.DCLControllerV2, toChain) // Ethereum
    
    // CreditExecutor contract address (hardcoded for now as mentioned)
    const creditExecutorAddress = '0x1234567890123456789012345678901234567890' // TODO: Replace with actual deployed address

    // Calculate Ethereum gas costs in MANA
    const ethereumGasCostMANA = await this.calculateEthereumGasCostInMANA(toChain)
    console.log('📊 Calculated Ethereum gas cost in MANA:', ethereumGasCostMANA)

    // Calculate dynamic fromAmount including gas costs (per Fig's guidance)
    const dynamicFromAmount = await this.calculateFromAmountWithGas(
      fromAmount,
      fromChain,
      toChain,
      polygonMANA,
      ethereumMANA
    )

    // Get the route with CreditExecutor as sender for CORAL optimization
    const crossChainRoute = await this.squid.getRoute({
      fromAddress: creditExecutorAddress, // CreditExecutor is the sender
      fromAmount: dynamicFromAmount, // Dynamically calculated (100 MANA + gas costs)
      fromToken: polygonMANA,
      fromChain: fromChain.toString(),
      toToken: ethereumMANA,
      toChain: toChain.toString(),
      toAddress: controllerEthereum.address,
      enableBoost: enableExpress, // CORAL enabled

      postHook: {
        provider: 'Decentraland',
        description: `Register ${name} on Ethereum via CORAL + CreditExecutor`,
        logoURI:
          'https://cdn.decentraland.org/@dcl/marketplace-site/6.41.1/favicon.ico',
        chainType: ChainType.EVM,
        calls: [
          // Approve MANA for ENS Controller
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.DEFAULT,
            target: ethereumMANA,
            value: '0',
            callData: new ethers.utils.Interface(['function approve(address spender, uint256 amount)']).encodeFunctionData('approve', [
              controllerEthereum.address,
              '100000000000000000000' // 100 MANA
            ]),
            payload: {
              tokenAddress: ethereumMANA,
              inputPos: 0
            },
            estimatedGas: '46460' // Actual measured gas for approve
          },
          // Name registration on Ethereum using received MANA
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.DEFAULT,
            target: controllerEthereum.address,
            value: '0',
            callData: ControllerV2Interface.encodeFunctionData('register', [
              name,
              fromAddress // Original user address gets the ENS name
            ]),
            payload: {
              tokenAddress: ethereumMANA,
              inputPos: 0
            },
            estimatedGas: '289708' // Actual measured gas for register
          },
          // Transfer remaining MANA back to user
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.FULL_TOKEN_BALANCE,
            target: ethereumMANA,
            value: '0',
            callData: new ethers.utils.Interface(['function transfer(address to, uint256 amount)']).encodeFunctionData('transfer', [
              fromAddress,
              '0' // Will be replaced by FULL_TOKEN_BALANCE
            ]),
            payload: {
              tokenAddress: ethereumMANA,
              inputPos: 1
            },
            estimatedGas: '54261' // Actual measured gas for transfer
          }
        ]
      }
    })

    // Extract the calldata from the route to use in CreditExecutor
    const routeTransactionRequest = crossChainRoute.route.transactionRequest
    
    if (!routeTransactionRequest || !routeTransactionRequest.data) {
      throw new Error('Route transaction request not available')
    }

    // Check if this is a CORAL route by looking for "rfq" action type (per Fig's guidance)
    const isCoralRoute = (crossChainRoute.route as any).actions?.some((action: any) => action.type === 'rfq') || false
    console.log('🔥 CORAL Route Detected:', isCoralRoute)
    
    // Prepare the external call to CreditExecutor (not directly to CORAL)
    const externalCall = {
      target: creditExecutorAddress,
      selector: '0x12345678' as `0x${string}`, // CreditExecutor.execute selector (TODO: Get actual selector)
      data: ethers.utils.defaultAbiCoder.encode(
        ['tuple(address target, bytes4 selector, bytes data, uint256 expiresAt, bytes32 salt)', 'uint256'],
        [
          {
            target: routeTransactionRequest.target!,
            selector: routeTransactionRequest.data.slice(0, 10),
            data: '0x' + routeTransactionRequest.data.slice(10),
            expiresAt: isCoralRoute ? 
              Math.floor(Date.now() / 1000) + 1800 : // 30 min for CORAL
              Math.floor(Date.now() / 1000) + 300,   // 5 min for regular
            salt: ethers.utils.hexlify(ethers.utils.randomBytes(32))
          },
          ethereumGasCostMANA // Estimated fee parameter
        ]
      ),
      expiresAt: isCoralRoute ? 
        (Math.floor(Date.now() / 1000) + 1800).toString() : // 30 min for CORAL
        (Math.floor(Date.now() / 1000) + 300).toString(),   // 5 min for regular
      salt: ethers.utils.hexlify(ethers.utils.randomBytes(32))
    }

    console.log('🎯 CreditExecutor External Call:', {
      target: externalCall.target,
      selector: externalCall.selector,
      ethereumGasCostMANA,
      isCoralRoute
    })

    // Return the route with CreditsManager integration metadata
    return {
      route: crossChainRoute,
      creditsManagerFlow: {
        creditsManagerAddress: creditsManagerPolygon.address,
        useCreditsArgs: {
          credits,
          creditsSignatures,
          externalCall,
          customExternalCallSignature: externalCallSignature,
          maxUncreditedValue: '0', // No uncredited value needed with CreditExecutor
          maxCreditedValue: '100000000000000000000' // Only 100 MANA from credits
        }
      },
      ethereumGasCostMANA: ethereumGasCostMANA // For UI display
    }
  }

  // ❌ REMOVED: registerNameWithCredits - No longer needed
  // We now call CreditsManager.useCredits() directly, which calls CreditExecutor
  // The route is only used for calculating fees and preparing the external call data

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
    const ERC20ContractInterface = new ethers.utils.Interface(ERC20)
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
          [onChainTrade]
        ]),

        payload: {
          tokenAddress: NATIVE_TOKEN, // ex `0x`
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
          //  with FULL_TOKEN_BALANCE (instead of "0")
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
    const ERC20ContractInterface = new ethers.utils.Interface(ERC20)
    const marketplaceContractABI =
      toChain === ChainId.MATIC_MAINNET
        ? tradeId
          ? OffChainMarketplacePolygon
          : MarketplaceV2
        : tradeId
        ? OffChainMarketplaceEthereum
        : Marketplace

    const marketplaceInterface = new ethers.utils.Interface(
      marketplaceContractABI
    )
    const ERC721ContractInterface = new ethers.utils.Interface(ERC721)

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

  // MINT CALLS

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
      item: { collectionAddress, price, itemId, tradeId },
      fetchTradeData
    } = buyNFTCrossChainData

    const ERC20ContractInterface = new ethers.utils.Interface(ERC20)
    const collectionStoreInterface = new ethers.utils.Interface(CollectionStore)

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

    const marketplaceInterface = new ethers.utils.Interface(
      marketplaceContractABI
    )

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

  /**
   * Calculate Ethereum gas costs in MANA using Squid token prices
   * @param toChain Destination chain (Ethereum)
   * @returns Ethereum gas cost in MANA wei
   */
  private async calculateEthereumGasCostInMANA(toChain: ChainId): Promise<string> {
    try {
      // Gas consumption measured from actual transactions
      const TOTAL_GAS_UNITS = 390429 // approve (46460) + register (289708) + transfer (54261)
      
      // Get current ETH gas price (fallback to 20 gwei)
      const DEFAULT_GAS_PRICE = ethers.utils.parseUnits('20', 'gwei') // 20 gwei
      let gasPrice = DEFAULT_GAS_PRICE

      try {
        // Try to get real-time gas price from Squid's internal provider
        // Note: Squid SDK might not expose gas price directly, so we use fallback
        gasPrice = DEFAULT_GAS_PRICE
      } catch {
        gasPrice = DEFAULT_GAS_PRICE
      }

      // Calculate total gas cost in ETH
      const gasCostETH = gasPrice.mul(TOTAL_GAS_UNITS)

      // Get ETH and MANA tokens from Squid
      const ethToken = this.squid.tokens.find(t => 
        t.symbol.toLowerCase() === 'eth' && 
        t.chainId === toChain.toString()
      )
      
      const manaToken = this.squid.tokens.find(t => 
        t.symbol.toLowerCase() === 'mana' && 
        t.chainId === toChain.toString()
      )

      if (!ethToken || !manaToken) {
        console.warn('ETH or MANA token not found in Squid, using fallback calculation')
        // Fallback: Assume 1 ETH = 1500 USD, 1 MANA = 0.3 USD
        const ethPriceUSD = 1500
        const manaPriceUSD = 0.3
        const gasCostUSD = parseFloat(ethers.utils.formatEther(gasCostETH)) * ethPriceUSD
        const gasCostMANA = gasCostUSD / manaPriceUSD
        return ethers.utils.parseEther(gasCostMANA.toFixed(2)).toString()
      }

      // Get ETH price in USD
      const ethPriceUSD = parseFloat(ethToken.usdPrice?.toString() || '1500')
      
      // Get MANA price in USD  
      const manaPriceUSD = parseFloat(manaToken.usdPrice?.toString() || '0.3')

      // Convert gas cost to USD
      const gasCostUSD = parseFloat(ethers.utils.formatEther(gasCostETH)) * ethPriceUSD

      // Convert USD to MANA
      const gasCostMANA = gasCostUSD / manaPriceUSD

      // Add 20% safety margin for gas volatility
      const gasCostMANAWithMargin = gasCostMANA * 1.2

      console.log('💰 Gas Cost Calculation:', {
        totalGasUnits: TOTAL_GAS_UNITS,
        gasPriceGwei: ethers.utils.formatUnits(gasPrice, 'gwei'),
        gasCostETH: ethers.utils.formatEther(gasCostETH),
        ethPriceUSD,
        manaPriceUSD,
        gasCostUSD: gasCostUSD.toFixed(2),
        gasCostMANA: gasCostMANA.toFixed(2),
        gasCostMANAWithMargin: gasCostMANAWithMargin.toFixed(2)
      })

      return ethers.utils.parseEther(gasCostMANAWithMargin.toFixed(2)).toString()

    } catch (error) {
      console.error('Failed to calculate Ethereum gas cost in MANA:', error)
      
      // Fallback: 20 MANA for gas costs
      return ethers.utils.parseEther('20').toString()
    }
  }

  /**
   * Calculate fromAmount including dynamic gas costs
   * @param baseAmount Base amount needed (e.g., 100 MANA for names)
   * @param fromChain Source chain
   * @param toChain Destination chain  
   * @param fromToken Token address on source chain
   * @param toToken Token address on destination chain
   * @returns Total amount including gas costs
   */
  private async calculateFromAmountWithGas(
    baseAmount: string,
    fromChain: ChainId,
    toChain: ChainId,
    fromToken: string,
    toToken: string
  ): Promise<string> {
    try {
      // Use Squid's getFromAmount for accurate calculation including all costs
      const fromAmountParams = {
        fromToken: this.squid.tokens.find(t => 
          t.address.toLowerCase() === fromToken.toLowerCase() && 
          t.chainId === fromChain.toString()
        )!,
        toAmount: ethers.utils.formatEther(baseAmount), // Convert to readable format
        toToken: this.squid.tokens.find(t => 
          t.address.toLowerCase() === toToken.toLowerCase() && 
          t.chainId === toChain.toString()
        )!
      }

      const calculatedAmount = await this.squid.getFromAmount(fromAmountParams)
      
      // Add safety margin for gas price fluctuations (10%)
      const safetyMargin = ethers.BigNumber.from(calculatedAmount).mul(110).div(100)
      
      return safetyMargin.toString()
    } catch (error) {
      console.warn('Failed to calculate dynamic gas costs, using fallback:', error)
      
      // Fallback: Add estimated 15 MANA equivalent for gas costs
      const gasBuffer = ethers.utils.parseEther('15') // 15 MANA buffer
      const totalAmount = ethers.BigNumber.from(baseAmount).add(gasBuffer)
      
      return totalAmount.toString()
    }
  }
}
