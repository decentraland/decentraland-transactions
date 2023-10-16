import { ChainId } from '@dcl/schemas'

export type XChainCallData = {
  fromAddress: string
  fromAmount: string
  toAmount: string
  fromToken: string
  fromChain: ChainId
  toToken: string
  toChain: ChainId.MATIC_MAINNET | ChainId.MATIC_MUMBAI // TODO: Do we need ETH?
  toAddress: string
  enableExpress?: boolean
  slippage?: number
  nft: {
    collectionAddress: string
    tokenId: string
    price: string
  }
}
