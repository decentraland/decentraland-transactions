import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const erc721 = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.ERC721,
    address: '',
    name: 'ERC271',
    chainId: ChainId.MATIC_MUMBAI
  }
}
