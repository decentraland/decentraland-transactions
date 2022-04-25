import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const collectionFactoryV3 = {
  [ChainId.MATIC_MUMBAI]: {
    version: '3',
    abi: abis.CollectionFactoryV3,
    address: '0xDDb3781Fff645325C8896AA1F067bAa381607ecc',
    name: 'CollectionFactory',
    chainId: ChainId.MATIC_MUMBAI
  }
}
