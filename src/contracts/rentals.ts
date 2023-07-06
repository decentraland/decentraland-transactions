import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const rentals = {
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1',
    abi: abis.Rentals,
    address: '0xe70db6319e9cee3f604909bdade58d1f5c1cf702',
    name: 'Rentals',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1',
    abi: abis.Rentals,
    address: '0x3a1469499d0be105d4f77045ca403a5f6dc2f3f5',
    name: 'Rentals',
    chainId: ChainId.ETHEREUM_MAINNET
  }
}
