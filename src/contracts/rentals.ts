import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const rentals = {
  [ChainId.ETHEREUM_GOERLI]: {
    version: '1',
    abi: abis.Rentals,
    address: '0x92159c78f0f4523b9c60382bb888f30f10a46b3b',
    name: 'Rentals',
    chainId: ChainId.ETHEREUM_GOERLI
  }
}
