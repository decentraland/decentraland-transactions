import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const creditsManager = {
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.CreditsManager,
    address: '0x1985fa82b531cb4e20f103787eba99de67b5c25c',
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
