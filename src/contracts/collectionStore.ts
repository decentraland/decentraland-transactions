import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const collectionStore = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.CollectionStore,
    address: '0x6ddF1b1924DAD850AdBc1C02026535464Be06B0c',
    name: 'Decentraland Collection Store',
    chainId: ChainId.MATIC_MUMBAI
  }
}
