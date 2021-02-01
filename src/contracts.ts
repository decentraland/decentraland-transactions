import { abis } from './abis'
import { ContractData, ChainId } from './types'

export function getManaContract(chainId: ChainId): ContractData {
  let address: string
  let name: string
  let version = '1'

  switch (chainId) {
    case ChainId.GOERLI:
      address = '0xe7fDae84ACaba2A5Ba817B6E6D8A2d415DBFEdbe'
      name = 'MANAToken'
      break
    case ChainId.MATIC_TESTNET:
      address = '0x882Da5967c435eA5cC6b09150d55E8304B838f45'
      name = 'Decentraland MANA (PoS)'
      break
    case ChainId.MATIC_MAINNET:
      address = '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4'
      name = '(PoS) Decentraland MANA (MANA)'
      break
    default:
      throw new Error(`Invalid chain ${chainId}`)
  }
  return {
    abi: abis.MANA,
    address,
    name,
    version,
    chainId
  }
}
