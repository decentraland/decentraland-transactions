import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const collectionFactory = {
  [ChainId.ETHEREUM_ROPSTEN]: {
    version: '2',
    abi: abis.CollectionFactory,
    address: '0x16d8bac5b67a6b782a9081377bec413bc5bb56a6',
    name: 'CollectionFactory',
    chainId: ChainId.ETHEREUM_ROPSTEN
  },
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.CollectionFactory,
    address: '0x2C3212DEae0554E253e91cBa2B36A6ee888483C6',
    name: 'CollectionFactory',
    chainId: ChainId.MATIC_MUMBAI
  }
}
