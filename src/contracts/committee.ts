import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const committee = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.Committee,
    address: '0x55Ab761941dD07d71154922E09Df87023889a58d',
    name: 'Decentraland Collection Committee',
    chainId: ChainId.MATIC_MUMBAI
  }
}
