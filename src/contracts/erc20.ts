import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const erc20 = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.MATIC_MUMBAI
  }
}
