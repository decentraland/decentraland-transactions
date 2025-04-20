import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const creditsManager = {
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.CreditsManager,
    address: '0xa1691afad71b9a92d329f1a95c39d3077d8f2f5f',
    name: 'Decentraland Credits',
    chainId: ChainId.MATIC_AMOY
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1.0.0',
    abi: abis.CreditsManager,
    address: '0x6a03991dfa9d661ef7ad3c6f88b31f16e5a282cf',
    name: 'Decentraland Credits',
    chainId: ChainId.MATIC_MAINNET
  }
}
