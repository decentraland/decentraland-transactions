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
    address: '0xe9f961e6ded4e1476bbee4faab886d63a2493eb9',
    name: 'Decentraland Credits',
    chainId: ChainId.MATIC_MAINNET
  }
}
