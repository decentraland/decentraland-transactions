import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const collectionManager = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.CollectionManager,
    address: '0x79DC8d5cc3EcbEF1DB8EFA8989401DbD3bde70dd',
    name: 'Decentraland Collection Manager',
    chainId: ChainId.MATIC_MUMBAI
  }
}
