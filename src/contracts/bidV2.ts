import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const bidV2 = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.Bid,
    address: '0xa8f508624F4eFabD2A3a85099F15B0a3Fa06687a',
    name: 'Decentraland Bid',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '2',
    abi: abis.Bid,
    address: '0x5cF39E64392C615FD8086838883958752a11B486',
    name: 'Decentraland Bid',
    chainId: ChainId.MATIC_MAINNET
  }
}
