import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const rentals = {
  [ChainId.ETHEREUM_GOERLI]: {
    version: '1',
    abi: abis.Rentals,
    address: '0x92159c78f0f4523b9c60382bb888f30f10a46b3b',
    name: 'Rentals',
    chainId: ChainId.ETHEREUM_GOERLI
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1',
    abi: abis.Rentals,
    address: '0xcc94a49c7a81f59f07e0c381b929c4081c437de2',
    name: 'Rentals',
    chainId: ChainId.ETHEREUM_MAINNET
  }
}
