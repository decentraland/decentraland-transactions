import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const manaToken = {
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1',
    abi: abis.MANAToken,
    address: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
    name: 'MANAToken',
    chainId: ChainId.ETHEREUM_MAINNET
  },
  [ChainId.ETHEREUM_ROPSTEN]: {
    version: '1',
    abi: abis.MANAToken,
    address: '0x2a8fd99c19271f4f04b1b7b9c4f7cf264b626edb',
    name: 'MANAToken',
    chainId: ChainId.ETHEREUM_ROPSTEN
  },
  [ChainId.ETHEREUM_GOERLI]: {
    version: '1',
    abi: abis.MANAToken,
    address: '0xe7fDae84ACaba2A5Ba817B6E6D8A2d415DBFEdbe',
    name: 'MANAToken',
    chainId: ChainId.ETHEREUM_GOERLI
  },
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.MANAToken,
    address: '0x882Da5967c435eA5cC6b09150d55E8304B838f45',
    name: 'Decentraland MANA (PoS)',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1',
    abi: abis.MANAToken,
    address: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4',
    name: '(PoS) Decentraland MANA',
    chainId: ChainId.MATIC_MAINNET
  }
}
