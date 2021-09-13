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
    address: '0x71d9350Ef44E1e451F00e447C0DfF2d1FB75510a',
    name: 'Decentraland Collection Committee',
    chainId: ChainId.MATIC_MAINNET
  }
}
