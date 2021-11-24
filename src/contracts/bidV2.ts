import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const bidV2 = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.Bid,
    address: '0xa8f508624F4eFabD2A3a85099F15B0a3Fa06687a',
    name: 'Decentraland Bid',
    chainId: ChainId.MATIC_MUMBAI
  }
}
