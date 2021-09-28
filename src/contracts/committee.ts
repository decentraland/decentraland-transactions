import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const committee = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.Committee,
    address: '0xe18B1361d41afC44658216F3Dc27e48c2336e3c2',
    name: 'Decentraland Collection Committee',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1',
    abi: abis.Committee,
    address: '0xaeec95a8aa671a6d3fec56594827d7804964fa70',
    name: 'Decentraland Collection Committee',
    chainId: ChainId.MATIC_MAINNET
  }
}
