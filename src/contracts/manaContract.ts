import { abis } from '../abis'
import { ChainId } from '../types'

export const manaContract = {
  [ChainId.GOERLI]: {
    version: '1',
    abi: abis.MANAToken,
    address: '0xe7fDae84ACaba2A5Ba817B6E6D8A2d415DBFEdbe',
    name: 'MANAToken',
    chainId: ChainId.GOERLI
  },
  [ChainId.MATIC_TESTNET]: {
    version: '1',
    abi: abis.MANAToken,
    address: '0x882Da5967c435eA5cC6b09150d55E8304B838f45',
    name: 'Decentraland MANA (PoS)',
    chainId: ChainId.MATIC_TESTNET
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1',
    abi: abis.MANAToken,
    address: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4',
    name: '(PoS) Decentraland MANA (MANA)',
    chainId: ChainId.MATIC_MAINNET
  }
}
