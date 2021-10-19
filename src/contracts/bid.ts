import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const bid = {
  [ChainId.ETHEREUM_ROPSTEN]: {
    version: '1',
    abi: abis.Bid,
    address: '0x56636Bd98c362857159FD6Ffe9d18311D197d109',
    name: 'Decentraland Bid',
    chainId: ChainId.ETHEREUM_ROPSTEN
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1',
    abi: abis.Bid,
    address: '0xe479dfd9664c693b2e2992300930b00bfde08233',
    name: 'Decentraland Bid',
    chainId: ChainId.ETHEREUM_MAINNET
  }
}
