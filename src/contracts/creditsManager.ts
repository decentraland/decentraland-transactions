import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const creditsManager = {
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.CreditsManager,
    address: '0x037566bc90f85e76587e1b07f9184585f09c1420',
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
