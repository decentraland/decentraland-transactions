import { ContractName } from '../types'

import { Bid } from './Bid'
import { BidV2 } from './BidV2'
import { CollectionFactory } from './CollectionFactory'
import { CollectionManager } from './CollectionManager'
import { CollectionStore } from './CollectionStore'
import { Committee } from './Committee'
import { ERC20 } from './ERC20'
import { ERC721 } from './ERC721'
import { ERC721CollectionV2 } from './ERC721CollectionV2'
import { Forwarder } from './Forwarder'
import { MANAToken } from './MANAToken'
import { Marketplace } from './Marketplace'
import { MarketplaceV2 } from './MarketplaceV2'
import { Rarities } from './Rarities'
import { Tiers } from './Tiers'
import { ThirdPartyRegistry } from './ThirdPartyRegistry'
import { ChainlinkOracle } from './ChainlinkOracle'
import { RaritiesWithOracle } from './RaritiesWithOracle'
import { CollectionFactoryV3 } from './CollectionFactoryV3'
import { Rentals } from './Rentals'
import { DCLRegistrar } from './DCLRegistrar'
import { DCLController } from './DCLController'
import { DCLControllerV2 } from './DCLControllerV2'
import { OffChainMarketplaceEthereum } from './OffChainMarketplaceEthereum'
import { Network } from '@dcl/schemas'
import { OffChainMarketplacePolygon } from './OffChainMarketplacePolygon'

export const abis = {
  [ContractName.Bid]: Bid,
  [ContractName.BidV2]: BidV2,
  [ContractName.CollectionFactory]: CollectionFactory,
  [ContractName.CollectionFactoryV3]: CollectionFactoryV3,
  [ContractName.CollectionManager]: CollectionManager,
  [ContractName.CollectionStore]: CollectionStore,
  [ContractName.Committee]: Committee,
  [ContractName.ERC20]: ERC20,
  [ContractName.ERC721]: ERC721,
  [ContractName.ERC721CollectionV2]: ERC721CollectionV2,
  [ContractName.Forwarder]: Forwarder,
  [ContractName.MANAToken]: MANAToken,
  [ContractName.Marketplace]: Marketplace,
  [ContractName.MarketplaceV2]: MarketplaceV2,
  [ContractName.Rarities]: Rarities,
  [ContractName.RaritiesWithOracle]: RaritiesWithOracle,
  [ContractName.ThirdPartyRegistry]: ThirdPartyRegistry,
  [ContractName.Tiers]: Tiers,
  [ContractName.ChainlinkOracle]: ChainlinkOracle,
  [ContractName.Rentals]: Rentals,
  [ContractName.DCLRegistrar]: DCLRegistrar,
  [ContractName.DCLController]: DCLController,
  [ContractName.DCLControllerV2]: DCLControllerV2,
  [ContractName.OffChainMarketplace]: {
    [Network.ETHEREUM]: OffChainMarketplaceEthereum,
    [Network.MATIC]: OffChainMarketplacePolygon
  }
}
