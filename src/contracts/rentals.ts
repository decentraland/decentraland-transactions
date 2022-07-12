import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const rentals = {
  [ChainId.ETHEREUM_GOERLI]: {
    version: '1',
    abi: abis.Rentals,
    address: '0xBB2A03bf5f525734Cb0536bE4bE61BA788d7Ee01',
    name: 'Rentals',
    chainId: ChainId.ETHEREUM_GOERLI
  }
}
