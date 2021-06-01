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
    address: '0x2A72Ec4241Ac4fBc915ae98aC5a5b01AdE721f4B',
    name: 'CollectionFactory',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '2',
    abi: abis.CollectionFactory,
    address: '0xB549B2442b2BD0a53795BC5cDcBFE0cAF7ACA9f8',
    name: 'CollectionFactory',
    chainId: ChainId.MATIC_MAINNET
  }
}
