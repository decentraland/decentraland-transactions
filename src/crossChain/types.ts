import type { Squid } from '@0xsquid/sdk'
import { ChainId, OnChainTrade, Order, Trade } from '@dcl/schemas'
import {
  ChainData as SquidChainData,
  Token as SquidToken,
  RouteResponse as SquidRouteResponse,
  StatusResponse as SquidStatusResponse
} from '@0xsquid/sdk/dist/types'
import { Provider } from 'decentraland-connect'

export type CrossChainData = {
  fromAddress: string
  fromAmount: string
  toAmount: string
  fromToken: string
  fromChain: ChainId
  toChain: ChainId
  enableExpress?: boolean
  slippage?: number
}

export type BuyNFTCrossChainData = CrossChainData & {
  order: Order
  fetchTradeData?: () => Promise<{ onChainTrade: OnChainTrade }>
}

export type AcceptTradeData = CrossChainData & {
  trade: Trade
  onChainTrade: OnChainTrade
}

export type RegisterNameCrossChainData = CrossChainData & {
  name: string
}

export type MintNFTCrossChainData = CrossChainData & {
  item: {
    collectionAddress: string
    itemId: string
    price: string
    tradeId?: string
  }
  fetchTradeData?: () => Promise<{ onChainTrade: OnChainTrade }>
}

export type FromAmountParams = {
  fromToken: Token
  toAmount: string
  toToken: Token
}

export const CROSS_CHAIN_SUPPORTED_CHAINS = [
  ChainId.MATIC_AMOY,
  ChainId.ETHEREUM_SEPOLIA,
  ChainId.ETHEREUM_MAINNET,
  ChainId.MATIC_MAINNET,
  ChainId.OPTIMISM_MAINNET,
  ChainId.ARBITRUM_MAINNET,
  ChainId.AVALANCHE_MAINNET,
  ChainId.BSC_MAINNET,
  ChainId.FANTOM_MAINNET
]

export interface CrossChainProvider {
  squid: Squid
  initialized: boolean
  init(): Promise<void>
  isLibInitialized(): boolean
  getFromAmount(fromAmountParams: FromAmountParams): Promise<string>
  getSupportedTokens(): SquidToken[]
  getSupportedChains(): SquidChainData[]
  executeRoute(route: RouteResponse, provider: Provider): Promise<any>
  buyNFT(
    provider: Provider,
    buyNFTCrossChainData: BuyNFTCrossChainData
  ): Promise<string>
  getRegisterNameRoute(
    getRegisterNameCrossChainData: RegisterNameCrossChainData
  ): Promise<RouteResponse>
  getBuyNFTRoute(
    buyNFTCrossChainData: BuyNFTCrossChainData
  ): Promise<RouteResponse>
  mintNFT(
    provider: Provider,
    mintNFTCrossChainData: MintNFTCrossChainData
  ): Promise<string>
  getMintNFTRoute(
    buyNFTCrossChainData: MintNFTCrossChainData
  ): Promise<RouteResponse>
  getStatus(
    routeRequestId: string,
    originChainTxHash: string
  ): Promise<SquidStatusResponse>
}

export type ChainData = SquidChainData
export type Token = SquidToken
export type RouteResponse = SquidRouteResponse
export type Route = RouteResponse
export type StatusResponse = SquidStatusResponse
