import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const rarities = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.Rarities,
    address: '0x540ed731A11dE041c09CA1bd4e5729dbF8A721Ea',
    name: 'Decentraland Rarities',
    chainId: ChainId.MATIC_MUMBAI
  }
}
