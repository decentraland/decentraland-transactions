import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const rentals = {
  [ChainId.ETHEREUM_GOERLI]: {
    version: '1',
    abi: abis.Rentals,
    address: '0xA63fD08ac61F89B8dbD0EE279922675Aa9130445',
    name: 'Rentals',
    chainId: ChainId.ETHEREUM_GOERLI
  },
}
