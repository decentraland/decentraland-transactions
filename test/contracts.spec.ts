import { ChainId } from '@dcl/schemas'
import { abis } from '../src/abis'
import { getContract, getContractName } from '../src/contracts'
import { ContractData, ContractName } from '../src/types'

describe('#getContract', () => {
  it('should throw if the contract name is not supported', () => {
    const contractName = 'Nonsense' as any
    expect(() => getContract(contractName, ChainId.ETHEREUM_MAINNET)).toThrow(
      `Could not get a valid contract for name: ${contractName}`
    )
  })

  describe('MANAToken', () => {
    const abi = abis.MANAToken

    it('should return the configuration for Goerli', () => {
      expect(
        getContract(ContractName.MANAToken, ChainId.ETHEREUM_GOERLI)
      ).toEqual({
        abi,
        address: '0xe7fDae84ACaba2A5Ba817B6E6D8A2d415DBFEdbe',
        name: 'MANAToken',
        version: '1',
        chainId: ChainId.ETHEREUM_GOERLI
      })
    })

    it('should return the configuration for Mumbai', () => {
      expect(getContract(ContractName.MANAToken, ChainId.MATIC_MUMBAI)).toEqual(
        {
          abi,
          address: '0x882Da5967c435eA5cC6b09150d55E8304B838f45',
          name: 'Decentraland MANA (PoS)',
          version: '1',
          chainId: ChainId.MATIC_MUMBAI
        }
      )
    })

    it('should return the configuration for Matic Mainnet', () => {
      expect(
        getContract(ContractName.MANAToken, ChainId.MATIC_MAINNET)
      ).toEqual({
        abi,
        address: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4',
        name: '(PoS) Decentraland MANA',
        version: '1',
        chainId: ChainId.MATIC_MAINNET
      })
    })

    it('should throw if the chain is not supported', () => {
      expect(() =>
        getContract(ContractName.Rarities, ChainId.ETHEREUM_RINKEBY)
      ).toThrow(
        `Could not get a valid contract for ${ContractName.Rarities} using chain ${ChainId.ETHEREUM_RINKEBY}`
      )
    })
  })

  describe('when getting the OffChainMarketplaceV3 contract', () => {
    describe('and the chain is Ethereum Sepolia', () => {
      let contract: ContractData

      beforeEach(() => {
        contract = getContract(
          ContractName.OffChainMarketplaceV3,
          ChainId.ETHEREUM_SEPOLIA
        )
      })

      it('should return the DecentralandMarketplaceEthereum configuration with the V3 Ethereum abi', () => {
        expect(contract).toEqual({
          abi: abis.OffChainMarketplaceV3.ETHEREUM,
          address: '0x257db44ac97789c16ab277eae87dcde0c246cc9f',
          name: 'DecentralandMarketplaceEthereum',
          version: '1.0.0',
          chainId: ChainId.ETHEREUM_SEPOLIA
        })
      })
    })

    describe('and the chain is Matic Amoy', () => {
      let contract: ContractData

      beforeEach(() => {
        contract = getContract(
          ContractName.OffChainMarketplaceV3,
          ChainId.MATIC_AMOY
        )
      })

      it('should return the DecentralandMarketplacePolygon configuration with the V3 Polygon abi', () => {
        expect(contract).toEqual({
          abi: abis.OffChainMarketplaceV3.MATIC,
          address: '0x36fd1434a6c4b8ade80c9847c1d15033ce34488c',
          name: 'DecentralandMarketplacePolygon',
          version: '1.0.0',
          chainId: ChainId.MATIC_AMOY
        })
      })
    })

    describe('and the chain is Ethereum Mainnet, where it is not deployed yet', () => {
      it('should throw signaling that the chain is not supported', () => {
        expect(() =>
          getContract(
            ContractName.OffChainMarketplaceV3,
            ChainId.ETHEREUM_MAINNET
          )
        ).toThrow(
          `Could not get a valid contract for ${ContractName.OffChainMarketplaceV3} using chain ${ChainId.ETHEREUM_MAINNET}`
        )
      })
    })

    describe('and the chain is Matic Mainnet, where it is not deployed yet', () => {
      it('should throw signaling that the chain is not supported', () => {
        expect(() =>
          getContract(ContractName.OffChainMarketplaceV3, ChainId.MATIC_MAINNET)
        ).toThrow(
          `Could not get a valid contract for ${ContractName.OffChainMarketplaceV3} using chain ${ChainId.MATIC_MAINNET}`
        )
      })
    })
  })

  describe('when getting the CouponManager contract', () => {
    describe('and the chain is Ethereum Sepolia', () => {
      let contract: ContractData

      beforeEach(() => {
        contract = getContract(
          ContractName.CouponManager,
          ChainId.ETHEREUM_SEPOLIA
        )
      })

      it('should return the CouponManager configuration', () => {
        expect(contract).toEqual({
          abi: abis.CouponManager,
          address: '0xed558211ae5ae57a6704423918cb9b8501051af0',
          name: 'CouponManager',
          version: '1.0.0',
          chainId: ChainId.ETHEREUM_SEPOLIA
        })
      })
    })

    describe('and the chain is Matic Amoy', () => {
      let contract: ContractData

      beforeEach(() => {
        contract = getContract(ContractName.CouponManager, ChainId.MATIC_AMOY)
      })

      it('should return the CouponManager configuration', () => {
        expect(contract).toEqual({
          abi: abis.CouponManager,
          address: '0x6c956587d9fe70032781edcdc626310648575382',
          name: 'CouponManager',
          version: '1.0.0',
          chainId: ChainId.MATIC_AMOY
        })
      })
    })
  })

  describe('when getting the CollectionDiscountCoupon contract', () => {
    describe('and the chain is Matic Amoy', () => {
      let contract: ContractData

      beforeEach(() => {
        contract = getContract(
          ContractName.CollectionDiscountCoupon,
          ChainId.MATIC_AMOY
        )
      })

      it('should return the CollectionDiscountCoupon configuration', () => {
        expect(contract).toEqual({
          abi: abis.CollectionDiscountCoupon,
          address: '0x4ee8f6b87f4917a3bbc7c8bb3a06db8555f83db9',
          name: 'CollectionDiscountCoupon',
          version: '1.0.0',
          chainId: ChainId.MATIC_AMOY
        })
      })
    })

    describe('and the chain is Ethereum Sepolia, where collections do not exist', () => {
      it('should throw signaling that the chain is not supported', () => {
        expect(() =>
          getContract(
            ContractName.CollectionDiscountCoupon,
            ChainId.ETHEREUM_SEPOLIA
          )
        ).toThrow(
          `Could not get a valid contract for ${ContractName.CollectionDiscountCoupon} using chain ${ChainId.ETHEREUM_SEPOLIA}`
        )
      })
    })
  })
})

describe('#getContractName', () => {
  it('should return the contract name by address', () => {
    const address = '0x882Da5967c435eA5cC6b09150d55E8304B838f45'
    expect(getContractName(address)).toBe(ContractName.MANAToken)
  })

  it('should support addresses from multiple chains', () => {
    const addressMumbai = '0x882Da5967c435eA5cC6b09150d55E8304B838f45'
    const addressMainnet = '0x8e5660b4ab70168b5a6feea0e0315cb49c8cd539'

    expect(getContractName(addressMumbai)).toBe(ContractName.MANAToken)
    expect(getContractName(addressMainnet)).toBe(ContractName.Marketplace)
  })

  it('should support all cases', () => {
    const lowerCaseAddress = '0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4'
    const upperCaseAddress = '0XA1C57F48F0DEB89F569DFBE6E2B7F46D33606FD4'
    const mixedCaseAddress = '0xA1C57f48f0deb89F569DFbe6e2B7f46d33606Fd4'

    expect(getContractName(lowerCaseAddress)).toBe(ContractName.MANAToken)
    expect(getContractName(upperCaseAddress)).toBe(ContractName.MANAToken)
    expect(getContractName(mixedCaseAddress)).toBe(ContractName.MANAToken)
  })

  describe('when the address belongs to a newly deployed contract', () => {
    describe('and it is the Amoy off-chain marketplace', () => {
      let address: string

      beforeEach(() => {
        address = '0x36fd1434a6c4b8ade80c9847c1d15033ce34488c'
      })

      it('should return the OffChainMarketplaceV3 name', () => {
        expect(getContractName(address)).toBe(
          ContractName.OffChainMarketplaceV3
        )
      })
    })

    describe('and it is the Sepolia coupon manager', () => {
      let address: string

      beforeEach(() => {
        address = '0xed558211ae5ae57a6704423918cb9b8501051af0'
      })

      it('should return the CouponManager name', () => {
        expect(getContractName(address)).toBe(ContractName.CouponManager)
      })
    })

    describe('and it is the Amoy collection discount coupon', () => {
      let address: string

      beforeEach(() => {
        address = '0x4ee8f6b87f4917a3bbc7c8bb3a06db8555f83db9'
      })

      it('should return the CollectionDiscountCoupon name', () => {
        expect(getContractName(address)).toBe(
          ContractName.CollectionDiscountCoupon
        )
      })
    })
  })

  it('should throw if the address does not correspond to a contract', () => {
    const address = '0xc0ffee254729296a45a3885639AC7E10F9d54979'
    expect(() => getContractName(address)).toThrow(
      `Could not get a valid contract name for address ${address}`
    )
  })
})
