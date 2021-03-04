import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const collectionStore = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.CollectionStore,
    address: '0x56D5cD2A5F299854c2Ab3EE4c3126f285140BB9b',
    name: 'Decentraland Collection Store',
    chainId: ChainId.MATIC_MUMBAI
  }
}
