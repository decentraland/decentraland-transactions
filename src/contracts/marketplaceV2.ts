import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const marketplaceV2 = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.MarketplaceV2,
    address: '0x5A467398dfa9d5C663a656423A2D055f538198A4',
    name: 'Decentraland Marketplace',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '2',
    abi: abis.MarketplaceV2,
    address: '0x480a0f4e360E8964e68858Dd231c2922f1df45Ef',
    name: 'Decentraland Marketplace',
    chainId: ChainId.MATIC_MAINNET
  }
}
