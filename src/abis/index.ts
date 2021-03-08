import { ContractName } from '../types'

<<<<<<< HEAD
import { CollectionFactory } from './CollectionFactory'
import { CollectionManager } from './CollectionManager'
import { CollectionStore } from './CollectionStore'
import { Committee } from './Committee'
import { ERC721CollectionV2 } from './ERC721CollectionV2'
import { Forwarder } from './Forwarder'
=======
import { CollectionManager } from './CollectionManager'
import { CollectionStore } from './CollectionStore'
import { Committee } from './Committee'
import { ERC20 } from './ERC20'
import { ERC721 } from './ERC721'
import { ERC721CollectionV2 } from './ERC721CollectionV2'
>>>>>>> 2623147... feat: add erc token contracts
import { MANAToken } from './MANAToken'
import { Marketplace } from './Marketplace'
import { Rarities } from './Rarities'

export const abis = {
<<<<<<< HEAD
  [ContractName.CollectionFactory]: CollectionFactory,
  [ContractName.CollectionManager]: CollectionManager,
  [ContractName.CollectionStore]: CollectionStore,
  [ContractName.Committee]: Committee,
  [ContractName.ERC721CollectionV2]: ERC721CollectionV2,
  [ContractName.Forwarder]: Forwarder,
=======
  [ContractName.CollectionManager]: CollectionManager,
  [ContractName.CollectionStore]: CollectionStore,
  [ContractName.Committee]: Committee,
  [ContractName.ERC20]: ERC20,
  [ContractName.ERC721]: ERC721,
  [ContractName.ERC721CollectionV2]: ERC721CollectionV2,
>>>>>>> 2623147... feat: add erc token contracts
  [ContractName.MANAToken]: MANAToken,
  [ContractName.Marketplace]: Marketplace,
  [ContractName.Rarities]: Rarities
}
