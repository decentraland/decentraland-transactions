import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const rentals = {
  [ChainId.ETHEREUM_GOERLI]: {
    version: '1',
    abi: abis.Rentals,
    address: '0xbb2a03bf5f525734cb0536be4be61ba788d7ee01',
    name: 'Rentals',
    chainId: ChainId.ETHEREUM_GOERLI
  }
}
