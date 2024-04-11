import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const collectionFactoryV3 = {
  [ChainId.MATIC_MUMBAI]: {
    version: '3',
    abi: abis.CollectionFactoryV3,
    address: '0xDDb3781Fff645325C8896AA1F067bAa381607ecc',
    name: 'CollectionFactory',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '3',
    abi: abis.CollectionFactoryV3,
    address: '0x3195e88aE10704b359764CB38e429D24f1c2f781',
    name: 'CollectionFactory',
    chainId: ChainId.MATIC_MAINNET
  },
  [ChainId.MATIC_AMOY]: {
    version: '3',
    abi: abis.CollectionFactoryV3,
    address: '0xe21289022b9324f9b9145a91ee59297ceb040c06',
    name: 'CollectionFactory',
    chainId: ChainId.MATIC_AMOY
  }
}
