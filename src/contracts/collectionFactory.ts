import { ChainId } from '../schemas'
import { abis } from '../abis'

export const collectionFactory = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.CollectionFactory,
    address: '0x0657fA4a3B14E568b0D9D49910D2875C5B6620F0',
    name: 'CollectionFactory',
    chainId: ChainId.MATIC_MUMBAI
  }
}
