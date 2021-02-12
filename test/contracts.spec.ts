import { expect } from 'chai'
import { abis } from '../src/abis'
import { getContract } from '../src/contracts'
import { ContractName, ChainId } from '../src/types'

describe('#getContract', () => {
  it('should throw if the contract name is not supported', () => {
    const contractName = 'Nonsense' as any
    expect(() => getContract(contractName, ChainId.ETHEREUM_MAINNET)).to.throw(
      'Invalid contract name: Nonsense'
    )
  })

  describe('MANAToken', () => {
    const abi = abis.MANAToken

    it('should return the configuration for Goerli', () => {
      expect(
        getContract(ContractName.MANAToken, ChainId.ETHEREUM_GOERLI)
      ).to.deep.eq({
        abi,
        address: '0xe7fDae84ACaba2A5Ba817B6E6D8A2d415DBFEdbe',
        name: 'MANAToken',
        version: '1',
        chainId: ChainId.ETHEREUM_GOERLI
      })
    })

    it('should return the configuration for Mumbai', () => {
      expect(
        getContract(ContractName.MANAToken, ChainId.MATIC_MUMBAI)
      ).to.deep.eq({
        abi,
        address: '0x882Da5967c435eA5cC6b09150d55E8304B838f45',
        name: 'Decentraland MANA (PoS)',
        version: '1',
        chainId: ChainId.MATIC_MUMBAI
      })
    })

    it('should return the configuration for Matic Mainnet', () => {
      expect(
        getContract(ContractName.MANAToken, ChainId.MATIC_MAINNET)
      ).to.deep.eq({
        abi,
        address: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4',
        name: '(PoS) Decentraland MANA (MANA)',
        version: '1',
        chainId: ChainId.MATIC_MAINNET
      })
    })

    it('should throw if the network is not supported', () => {
      expect(() =>
        getContract(ContractName.MANAToken, ChainId.ETHEREUM_ROPSTEN)
      ).to.throw(`Invalid chain ${ChainId.ETHEREUM_ROPSTEN}`)
    })
  })
})
