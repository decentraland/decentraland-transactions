import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const rarities = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.Rarities,
    address: '0x8eabF06f6cf667915bfF30138be70543bCE2901A',
    name: 'Decentraland Rarities',
    chainId: ChainId.MATIC_MUMBAI
  }
}
