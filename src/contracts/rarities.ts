import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const rarities = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.Rarities,
    address: '0x8eabF06f6cf667915bfF30138be70543bCE2901A',
    name: 'Decentraland Rarities',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1',
    abi: abis.Rarities,
    address: '0x17113b44fdd661A156cc01b5031E3aCF72c32EB3',
    name: 'Decentraland Rarities',
    chainId: ChainId.MATIC_MAINNET
  },
  [ChainId.MATIC_AMOY]: {
    version: '1',
    abi: abis.Rarities,
    address: '0xddb3781fff645325c8896aa1f067baa381607ecc',
    name: 'Decentraland Rarities',
    chainId: ChainId.MATIC_AMOY
  }
}
