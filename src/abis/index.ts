import { ContractName } from '../types'

import { MANAToken } from './MANAToken'
import { ERC721CollectionV2 } from './ERC721CollectionV2'
import { CollectionManager } from './CollectionManager'
import { Committee } from './Committee'
import { Rarities } from './Rarities'
import { Marketplace } from './Marketplace'
import { CollectionStore } from './CollectionStore'


export const abis = {
  [ContractName.MANAToken]: MANAToken,
  [ContractName.ERC721CollectionV2]: ERC721CollectionV2,
  [ContractName.CollectionManager]: CollectionManager,
  [ContractName.Committee]: Committee,
  [ContractName.Rarities]: Rarities,
  [ContractName.Marketplace]: Marketplace,
  [ContractName.CollectionStore]: CollectionStore
}
