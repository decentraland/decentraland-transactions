import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const chainlinkOracle = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.ChainlinkOracle,
    address: '0x508d4AC10F057beACb7Cef6f112e79075045C3C9',
    name: 'Decentraland ChainLink Oracle',
    chainId: ChainId.MATIC_MUMBAI
  }
}
