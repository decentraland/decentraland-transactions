import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const creditsManager = {
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.CreditsManager,
    address: '0xb40a9a1afde767025626e9b0c17e028b6305d8b0',
    name: 'CreditsManagerPolygon',
    chainId: ChainId.MATIC_AMOY
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1.0.0',
    abi: abis.CreditsManager,
    address: '',
    name: 'CreditsManagerPolygon',
    chainId: ChainId.MATIC_MAINNET
  }
}
