import { ChainId } from '../schemas'
import { abis } from '../abis'

export const committee = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.Committee,
    address: '0xf22B2172998c3A40c8E38452d3A08D143b30223f',
    name: 'Decentraland Collection Committee',
    chainId: ChainId.MATIC_MUMBAI
  }
}
