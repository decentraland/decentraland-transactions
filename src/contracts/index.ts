import { ChainId } from '@dcl/schemas'
import { ContractName, ContractData } from '../types'
import { manaContract } from './manaContract'
import { erc721CollectionV2Contract } from './erc721CollectionV2Contract'
import { collectionManagerContract } from './collectionManagerContract'
import { committeeContract } from './committeeContract'
import { raritiesContract } from './raritiesContract'
import { marketplaceContract } from './marketplaceContract'
import { collectionStoreContract } from './collectionStoreContract'

const contracts: Record<
  ContractName,
  Partial<Record<ChainId, ContractData>>
> = {
  [ContractName.MANAToken]: manaContract,
  [ContractName.ERC721CollectionV2]: erc721CollectionV2Contract,
  [ContractName.CollectionManager]: collectionManagerContract,
  [ContractName.Committee]: committeeContract,
  [ContractName.Rarities]: raritiesContract,
  [ContractName.Marketplace]: marketplaceContract,
  [ContractName.CollectionStore]: collectionStoreContract
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
