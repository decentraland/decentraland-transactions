import { ContractName } from '../types'

import { CollectionFactory } from './CollectionFactory'
import { CollectionManager } from './CollectionManager'
import { CollectionStore } from './CollectionStore'
import { Committee } from './Committee'
import { ERC721CollectionV2 } from './ERC721CollectionV2'
import { Forwarder } from './Forwarder'
import { MANAToken } from './MANAToken'
import { Marketplace } from './Marketplace'
import { Rarities } from './Rarities'

export const abis = {
  [ContractName.CollectionFactory]: CollectionFactory,
  [ContractName.CollectionManager]: CollectionManager,
  [ContractName.CollectionStore]: CollectionStore,
  [ContractName.Committee]: Committee,
  [ContractName.ERC721CollectionV2]: ERC721CollectionV2,
  [ContractName.Forwarder]: Forwarder,
  [ContractName.MANAToken]: MANAToken,
  [ContractName.Marketplace]: Marketplace,
  [ContractName.Rarities]: Rarities
}
