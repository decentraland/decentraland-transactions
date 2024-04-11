import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const raritiesWithOracle = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.RaritiesWithOracle,
    address: '0xb9957735bbe6D42585058Af11AA72da8eAD9043a',
    name: 'Decentraland Rarities with Oracle',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1',
    abi: abis.RaritiesWithOracle,
    address: '0xA9158E22F89Bb3F69c5600338895Cb5FB81e5090',
    name: 'Decentraland Rarities with Oracle',
    chainId: ChainId.MATIC_MAINNET
  },
  [ChainId.MATIC_AMOY]: {
    version: '1',
    abi: abis.RaritiesWithOracle,
    address: '0x25b6b4bac4adb582a0abd475439da6730777fbf7',
    name: 'Decentraland Rarities with Oracle',
    chainId: ChainId.MATIC_AMOY
  }
}
