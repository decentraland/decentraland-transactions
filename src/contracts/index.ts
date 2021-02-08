import { ContractName, ContractData, ChainId } from '../types'
import { manaContract } from './manaContract'

const contracts: Record<
  ContractName,
  Partial<Record<ChainId, ContractData>>
> = {
  [ContractName.MANAToken]: manaContract
}

export function getContract(
  contractName: ContractName,
  chainId: ChainId
): ContractData {
  const contract = contracts[contractName]
  if (!contract) {
    throw new Error(`Invalid contract name: ${contractName}`)
  }

  if (!contract[chainId]) {
    throw new Error(`Invalid chain ${chainId}`)
  }

  return contract[chainId]!
}
