import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const creditsManager = {
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.CreditsManager,
    address: '0x8052a560e6e6ac86eeb7e711a4497f639b322fb3',
    name: 'Decentraland Credits',
    chainId: ChainId.MATIC_AMOY
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1.0.0',
    abi: abis.CreditsManager,
    address: '0x8b3a40ca1b6f5cafc99d112a4d02e897d1fd8cc5',
    name: 'Decentraland Credits',
    chainId: ChainId.MATIC_MAINNET
  }
}
