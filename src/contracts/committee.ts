import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const committee = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.Committee,
    address: '0x4bb5ACe5ceB3Dd51ea35fa01a8f9B5507c234270',
    name: 'Decentraland Collection Committee',
    chainId: ChainId.MATIC_MUMBAI
  }
}
