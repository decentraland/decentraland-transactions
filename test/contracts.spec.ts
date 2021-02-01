import { expect } from 'chai'
import { abis } from '../src/abis'
import { getManaContract } from '../src/contracts'
import { ChainId } from '../src/types'

describe('#getManaContract', () => {
  const abi = abis.MANA
  it('should return the configuration for Goerli', () => {
    expect(getManaContract(ChainId.GOERLI)).to.deep.eq({
      abi,
      address: '0xe7fDae84ACaba2A5Ba817B6E6D8A2d415DBFEdbe',
      name: 'MANAToken',
      version: '1',
      chainId: ChainId.GOERLI
    })
  })

  it('should return the configuration for Mumbai', () => {
    expect(getManaContract(ChainId.MATIC_TESTNET)).to.deep.eq({
      abi,
      address: '0x882Da5967c435eA5cC6b09150d55E8304B838f45',
      name: 'Decentraland MANA (PoS)',
      version: '1',
      chainId: ChainId.MATIC_TESTNET
    })
  })

  it('should return the configuration for Matic Mainnet', () => {
    expect(getManaContract(ChainId.MATIC_MAINNET)).to.deep.eq({
      abi,
      address: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4',
      name: '(PoS) Decentraland MANA (MANA)',
      version: '1',
      chainId: ChainId.MATIC_MAINNET
    })
  })

  it('should throw if the network is not supported', () => {
    expect(() => getManaContract(ChainId.ROPSTEN)).to.throw(
      `Invalid chain ${ChainId.ROPSTEN}`
    )
  })
})
