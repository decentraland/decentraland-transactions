import { ContractName } from '../types'

import { Bid } from './Bid'
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
import { Rarities } from './Rarities'
import { Tiers } from './Tiers'
import { ThirdPartyRegistry } from './ThirdPartyRegistry'

export const abis = {
  [ContractName.Bid]: Bid,
  [ContractName.CollectionFactory]: CollectionFactory,
  [ContractName.CollectionManager]: CollectionManager,
  [ContractName.CollectionStore]: CollectionStore,
  [ContractName.Committee]: Committee,
  [ContractName.ERC20]: ERC20,
  [ContractName.ERC721]: ERC721,
  [ContractName.ERC721CollectionV2]: ERC721CollectionV2,
  [ContractName.Forwarder]: Forwarder,
  [ContractName.MANAToken]: MANAToken,
  [ContractName.Marketplace]: Marketplace,
  [ContractName.Rarities]: Rarities,
  [ContractName.ThirdPartyRegistry]: ThirdPartyRegistry,
  [ContractName.Tiers]: Tiers
}
