import { ContractName } from '../types'
import { Network } from '@dcl/schemas'

import Bid from './Bid.json'
import BidV2 from './BidV2.json'
import CollectionFactory from './CollectionFactory.json'
import CollectionManager from './CollectionManager.json'
import CollectionStore from './CollectionStore.json'
import Committee from './Committee.json'
import ERC20 from './ERC20.json'
import ERC721 from './ERC721.json'
import ERC721CollectionV2 from './ERC721CollectionV2.json'
import Forwarder from './Forwarder.json'
import MANAToken from './MANAToken.json'
import Marketplace from './Marketplace.json'
import MarketplaceV2 from './MarketplaceV2.json'
import Rarities from './Rarities.json'
import Tiers from './Tiers.json'
import ThirdPartyRegistry from './ThirdPartyRegistry.json'
import ChainlinkOracle from './ChainlinkOracle.json'
import RaritiesWithOracle from './RaritiesWithOracle.json'
import CollectionFactoryV3 from './CollectionFactoryV3.json'
import Rentals from './Rentals.json'
import DCLRegistrar from './DCLRegistrar.json'
import DCLController from './DCLController.json'
import DCLControllerV2 from './DCLControllerV2.json'
import OffChainMarketplaceEthereum from './OffChainMarketplaceEthereum.json'
import OffChainMarketplacePolygon from './OffChainMarketplacePolygon.json'
import CreditsManager from './CreditsManager.json'

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
  },
  [ContractName.CreditsManager]: CreditsManager
}
