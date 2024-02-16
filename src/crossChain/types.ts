import { ethers } from 'ethers'
import {
  ChainData as SquidChainData,
  Token as SquidToken,
  RouteResponse as SquidRouteResponse
} from '@0xsquid/sdk/dist/types'
import { Provider } from 'decentraland-connect'
import { ChainId } from '@dcl/schemas'

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
  nft: {
    collectionAddress: string
    tokenId: string
    price: string
  }
}

export type RegisterNameCrossChainData = CrossChainData & {
  name: string
}

export type MintNFTCrossChainData = CrossChainData & {
  item: {
    collectionAddress: string
    itemId: string
    price: string
  }
}

export type FromAmountParams = {
  fromToken: Token
  toAmount: string
  toToken: Token
}

export const CROSS_CHAIN_SUPPORTED_CHAINS = [
  ChainId.MATIC_MUMBAI,
  ChainId.ETHEREUM_SEPOLIA,
  ChainId.ETHEREUM_MAINNET,
  ChainId.MATIC_MAINNET,
  ChainId.OPTIMISM_MAINNET,
  ChainId.ARBITRUM_MAINNET,
  ChainId.AVALANCHE_MAINNET,
  ChainId.BSC_MAINNET,
  ChainId.FANTOM_MAINNET
]

export type ChainData = SquidChainData // for now, it's the same as the one provided by Squid, we can abstract it later
export type Token = SquidToken // same as the comment above
export type RouteResponse = SquidRouteResponse // same as the comment above
export type Route = RouteResponse // same as the comment above

export interface CrossChainProvider {
  init(): void
  isLibInitialized(): boolean
  getFromAmount(fromAmountParams: FromAmountParams): Promise<string>
  getSupportedTokens(): Token[]
  getSupportedChains(): ChainData[]
  buyNFT(
    provider: Provider,
    buyNFTCrossChainData: BuyNFTCrossChainData
  ): Promise<string>
  mintNFT(
    provider: Provider,
    ChainCallData: MintNFTCrossChainData
  ): Promise<string>
  getBuyNFTRoute(
    buyNFTCrossChainData: BuyNFTCrossChainData
  ): Promise<RouteResponse>
  getRegisterNameRoute(
    getRegisterNameCrossChainData: RegisterNameCrossChainData
  ): Promise<RouteResponse>
  getMintNFTRoute(
    buyNFTCrossChainData: MintNFTCrossChainData
  ): Promise<RouteResponse>
  executeRoute(
    route: RouteResponse,
    provider: Provider
  ): Promise<ethers.providers.TransactionReceipt>
}
