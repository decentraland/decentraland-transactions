import { ChainId } from '@dcl/schemas'
import { ContractName, ContractData } from '../types'

import { bid } from './bid'
import { bidV2 } from './bidV2'
import { collectionFactory } from './collectionFactory'
import { collectionFactoryV3 } from './collectionFactoryV3'
import { collectionManager } from './collectionManager'
import { collectionStore } from './collectionStore'
import { committee } from './committee'
import { erc20 } from './erc20'
import { erc721 } from './erc721'
import { erc721CollectionV2 } from './erc721CollectionV2'
import { forwarder } from './forwarder'
import { manaToken } from './manaToken'
import { marketplace } from './marketplace'
import { marketplaceV2 } from './marketplaceV2'
import { rarities } from './rarities'
import { tiers } from './tiers'
import { thirdPartyRegistry } from './thirdPartyRegistry'
import { chainlinkOracle } from './chainlinkOracle'
import { raritiesWithOracle } from './raritiesWithOracle'
import { rentals } from './rentals'
import { dclRegistrar } from './dclRegistrar'
import { dclController } from './dclController'
import { dclControllerV2 } from './dclControllerV2'
import { offChainMarketplace } from './offChainMarketplace'
import { offChainMarketplaceV2 } from './offChainMarketplaceV2'
import { creditsManager } from './creditsManager'

const contracts: Record<
  ContractName,
  Partial<Record<ChainId, ContractData>>
> = {
  [ContractName.Bid]: bid,
  [ContractName.BidV2]: bidV2,
  [ContractName.CollectionFactory]: collectionFactory,
  [ContractName.CollectionFactoryV3]: collectionFactoryV3,
  [ContractName.CollectionManager]: collectionManager,
  [ContractName.CollectionStore]: collectionStore,
  [ContractName.Committee]: committee,
  [ContractName.ERC20]: erc20,
  [ContractName.ERC721]: erc721,
  [ContractName.ERC721CollectionV2]: erc721CollectionV2,
  [ContractName.Forwarder]: forwarder,
  [ContractName.MANAToken]: manaToken,
  [ContractName.Marketplace]: marketplace,
  [ContractName.MarketplaceV2]: marketplaceV2,
  [ContractName.Rarities]: rarities,
  [ContractName.RaritiesWithOracle]: raritiesWithOracle,
  [ContractName.ThirdPartyRegistry]: thirdPartyRegistry,
  [ContractName.Tiers]: tiers,
  [ContractName.ChainlinkOracle]: chainlinkOracle,
  [ContractName.Rentals]: rentals,
  [ContractName.DCLRegistrar]: dclRegistrar,
  [ContractName.DCLController]: dclController,
  [ContractName.DCLControllerV2]: dclControllerV2,
  [ContractName.OffChainMarketplace]: offChainMarketplace,
  [ContractName.OffChainMarketplaceV2]: offChainMarketplaceV2,
  [ContractName.CreditsManager]: creditsManager
}

export function getContract(
  contractName: ContractName,
  chainId: ChainId
): ContractData {
  const contract = contracts[contractName]
  if (!contract) {
    throw new Error(`Could not get a valid contract for name: ${contractName}`)
  }

  if (!contract[chainId]) {
    throw new Error(
      `Could not get a valid contract for ${contractName} using chain ${chainId}`
    )
  }

  return contract[chainId]!
}

export function getContractName(address: string): ContractName {
  for (const contractName in contracts) {
    for (const chainId in contracts[contractName as ContractName]) {
      const contract =
        contracts[contractName as ContractName][(chainId as unknown) as ChainId]

      if (contract?.address.toLowerCase() === address.toLowerCase()) {
        return contractName as ContractName
      }
    }
  }
  throw new Error(`Could not get a valid contract name for address ${address}`)
}
