import { ethers } from 'ethers'
import {
  ChainData as SquidChainData,
  Token as SquidToken,
  RouteResponse as SquidRouteResponse
} from '@0xsquid/sdk/dist/types'
import { Provider } from 'decentraland-connect'
import { ChainId } from '@dcl/schemas'

export type BuyNFTCrossChainData = {
  fromAddress: string
  fromAmount: string
  toAmount: string
  fromToken: string
  fromChain: ChainId
  toChain: ChainId
  enableExpress?: boolean
  slippage?: number
  nft: {
    collectionAddress: string
    tokenId: string
    price: string
  }
}

export type MintNFTCrossChainData = Omit<BuyNFTCrossChainData, 'nft'> & {
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
  ChainId.MATIC_MAINNET
]

export type ChainData = SquidChainData
export type Token = SquidToken
export type RouteResponse = SquidRouteResponse
export type Route = RouteResponse

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
  getMintNFTRoute(
    buyNFTCrossChainData: MintNFTCrossChainData
  ): Promise<RouteResponse>
  executeRoute(
    route: RouteResponse,
    provider: Provider
  ): Promise<ethers.providers.TransactionReceipt>
}
