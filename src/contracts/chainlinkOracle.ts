import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

const name = 'Decentraland ChainLink Oracle'

export const chainlinkOracle = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.ChainlinkOracle,
    address: '0x508d4AC10F057beACb7Cef6f112e79075045C3C9',
    name,
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1',
    abi: abis.ChainlinkOracle,
    address: '0xe18B1361d41afC44658216F3Dc27e48c2336e3c2',
    name,
    chainId: ChainId.MATIC_MAINNET
  }
}
