import { ChainId } from '@dcl/schemas'
import { ContractName, ContractData } from '../types'

import { collectionFactory } from './collectionFactory'
import { collectionManager } from './collectionManager'
import { collectionStore } from './collectionStore'
import { committee } from './committee'
import { erc20 } from './erc20'
import { erc721 } from './erc721'
import { erc721CollectionV2 } from './erc721CollectionV2'
import { forwarder } from './forwarder'
import { manaToken } from './manaToken'
import { marketplace } from './marketplace'
import { rarities } from './rarities'

const contracts: Record<
  ContractName,
  Partial<Record<ChainId, ContractData>>
> = {
  [ContractName.CollectionFactory]: collectionFactory,
  [ContractName.CollectionManager]: collectionManager,
  [ContractName.CollectionStore]: collectionStore,
  [ContractName.Committee]: committee,
  [ContractName.ERC20]: erc20,
  [ContractName.ERC721]: erc721,
  [ContractName.ERC721CollectionV2]: erc721CollectionV2,
  [ContractName.Forwarder]: forwarder,
  [ContractName.MANAToken]: manaToken,
  [ContractName.Marketplace]: marketplace,
  [ContractName.Rarities]: rarities
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
