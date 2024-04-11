import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const collectionManager = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.CollectionManager,
    address: '0xe539E0AED3C1971560517D58277f8dd9aC296281',
    name: 'Decentraland Collection Manager',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1',
    abi: abis.CollectionManager,
    address: '0x9D32AaC179153A991e832550d9F96441Ea27763A',
    name: 'Decentraland Collection Manager',
    chainId: ChainId.MATIC_MAINNET
  },
  [ChainId.MATIC_AMOY]: {
    version: '1',
    abi: abis.CollectionManager,
    address: '0x5309ae874fc4eb21adcd63f8b6c3f766cc3b1849',
    name: 'Decentraland Collection Manager',
    chainId: ChainId.MATIC_AMOY
  }
}
