import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const bidV2 = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.Bid,
    address: '0x78Dd92c8941dBC7BE54E2a9390D58aD28AD97afD',
    name: 'Decentraland Bid',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '2',
    abi: abis.Bid,
    address: '0xb96697FA4A3361Ba35B774a42c58dACcaAd1B8E1',
    name: 'Decentraland Bid',
    chainId: ChainId.MATIC_MAINNET
  }
}
