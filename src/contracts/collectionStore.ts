import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const collectionStore = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.CollectionStore,
    address: '0x934477ec39CE757e95f5C7dD24562c1D5F5d1CC6',
    name: 'Decentraland Collection Store',
    chainId: ChainId.MATIC_MUMBAI
  }
}
