import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const tiers = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.Tiers,
    address: '0xdc899b9c1fa80292606c3cfba88bbbf0935c2e48',
    name: 'Decentraland Third Party Tiers',
    chainId: ChainId.MATIC_MUMBAI
  }
}
