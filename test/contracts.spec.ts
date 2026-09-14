import { ChainId } from '@dcl/schemas'
import { abis } from '../src/abis'
import {
  getContract,
  getContractName,
  getCouponManager
} from '../src/contracts'
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

    describe('and the chain is Ethereum Mainnet', () => {
      let contract: ContractData

      beforeEach(() => {
        contract = getContract(
          ContractName.OffChainMarketplaceV3,
          ChainId.ETHEREUM_MAINNET
        )
      })

      it('should return the DecentralandMarketplaceEthereum configuration with the V3 Ethereum abi', () => {
        expect(contract).toEqual({
          abi: abis.OffChainMarketplaceV3.ETHEREUM,
          address: '0x0f11d0d1671519683bd48abf3dbe779e300941cd',
          name: 'DecentralandMarketplaceEthereum',
          version: '1.0.0',
          chainId: ChainId.ETHEREUM_MAINNET
        })
      })
    })

    describe('and the chain is Matic Mainnet', () => {
      let contract: ContractData

      beforeEach(() => {
        contract = getContract(
          ContractName.OffChainMarketplaceV3,
          ChainId.MATIC_MAINNET
        )
      })

      it('should return the DecentralandMarketplacePolygon configuration with the V3 Polygon abi', () => {
        expect(contract).toEqual({
          abi: abis.OffChainMarketplaceV3.MATIC,
          address: '0xe38ef22abe871513555cba89adfe45ab4f548ada',
          name: 'DecentralandMarketplacePolygon',
          version: '1.0.0',
          chainId: ChainId.MATIC_MAINNET
        })
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

    describe('and it is the Ethereum mainnet off-chain marketplace', () => {
      let address: string

      beforeEach(() => {
        address = '0x0f11d0d1671519683bd48abf3dbe779e300941cd'
      })

      it('should return the OffChainMarketplaceV3 name', () => {
        expect(getContractName(address)).toBe(
          ContractName.OffChainMarketplaceV3
        )
      })
    })

    describe('and it is the Polygon mainnet off-chain marketplace', () => {
      let address: string

      beforeEach(() => {
        address = '0xe38ef22abe871513555cba89adfe45ab4f548ada'
      })

      it('should return the OffChainMarketplaceV3 name', () => {
        expect(getContractName(address)).toBe(
          ContractName.OffChainMarketplaceV3
        )
      })
    })

    describe('and it is the Ethereum mainnet coupon manager', () => {
      let address: string

      beforeEach(() => {
        address = '0xf9180eed9fcd5f8b3921c1b8caeb771c10faeb26'
      })

      it('should return the CouponManagerV3 name, the only one it is registered under', () => {
        expect(getContractName(address)).toBe(ContractName.CouponManagerV3)
      })
    })

    describe('and it is the Polygon mainnet coupon manager', () => {
      let address: string

      beforeEach(() => {
        address = '0x655fdfa91d69ea49f4ce1a8f7f7e2622c8630813'
      })

      it('should return the CouponManagerV3 name, the only one it is registered under', () => {
        expect(getContractName(address)).toBe(ContractName.CouponManagerV3)
      })
    })
  })

  describe('when the address is both the Polygon mainnet V2 marketplace and the Amoy V2 coupon manager', () => {
    let address: string

    beforeEach(() => {
      address = '0xa40b1d129b8906888720686f3a01921ddf37716f'
    })

    // Marketplaces are registered before managers, so the result is what it was before the Amoy entry existed.
    it('should keep resolving to the V2 marketplace', () => {
      expect(getContractName(address)).toBe(ContractName.OffChainMarketplaceV2)
    })
  })

  describe('when the address is registered under both the CouponManager alias and a versioned name', () => {
    let address: string

    beforeEach(() => {
      address = '0x3fd3056ee72a2a85e9392fab3a450e7736536081'
    })

    // The alias is registered first, so it keeps winning reverse lookup exactly as it did before the
    // versioned names existed: nothing that resolved this address changes what it resolves to.
    it('should keep resolving to the alias', () => {
      expect(getContractName(address)).toBe(ContractName.CouponManager)
    })
  })

  it('should throw if the address does not correspond to a contract', () => {
    const address = '0xc0ffee254729296a45a3885639AC7E10F9d54979'
    expect(() => getContractName(address)).toThrow(
      `Could not get a valid contract name for address ${address}`
    )
  })
})

describe('when getting the coupon contracts', () => {
  describe('and asking for the CouponManager alias', () => {
    it('should keep resolving the manager V2 points at on Matic Mainnet, unchanged', () => {
      expect(
        getContract(ContractName.CouponManager, ChainId.MATIC_MAINNET).address
      ).toBe('0x3fd3056ee72a2a85e9392fab3a450e7736536081')
    })

    it('should keep resolving the testnet managers, unchanged', () => {
      expect([
        getContract(ContractName.CouponManager, ChainId.MATIC_AMOY).address,
        getContract(ContractName.CouponManager, ChainId.ETHEREUM_SEPOLIA)
          .address
      ]).toEqual([
        '0x6c956587d9fe70032781edcdc626310648575382',
        '0xed558211ae5ae57a6704423918cb9b8501051af0'
      ])
    })

    it('should not grow onto Ethereum Mainnet, where only the versioned name exists', () => {
      expect(() =>
        getContract(ContractName.CouponManager, ChainId.ETHEREUM_MAINNET)
      ).toThrow(
        `Could not get a valid contract for ${ContractName.CouponManager} using chain ${ChainId.ETHEREUM_MAINNET}`
      )
    })
  })

  describe('and asking for the versioned managers', () => {
    it('should return the manager wired into V2 on Matic Mainnet', () => {
      expect(
        getContract(ContractName.CouponManagerV2, ChainId.MATIC_MAINNET)
      ).toEqual({
        abi: abis.CouponManager,
        address: '0x3fd3056ee72a2a85e9392fab3a450e7736536081',
        name: 'CouponManager',
        version: '1.0.0',
        chainId: ChainId.MATIC_MAINNET
      })
    })

    it('should return the manager wired into V2 on Amoy, which shares its address with the Polygon mainnet V2 marketplace', () => {
      expect(
        getContract(ContractName.CouponManagerV2, ChainId.MATIC_AMOY).address
      ).toBe('0xa40b1d129b8906888720686f3a01921ddf37716f')
    })

    it('should return the manager wired into V3 on every chain V3 is deployed on', () => {
      const chains = [
        ChainId.ETHEREUM_MAINNET,
        ChainId.MATIC_MAINNET,
        ChainId.ETHEREUM_SEPOLIA,
        ChainId.MATIC_AMOY
      ]
      expect(
        chains.map(
          chainId => getContract(ContractName.CouponManagerV3, chainId).address
        )
      ).toEqual([
        '0xf9180eed9fcd5f8b3921c1b8caeb771c10faeb26',
        '0x655fdfa91d69ea49f4ce1a8f7f7e2622c8630813',
        '0xed558211ae5ae57a6704423918cb9b8501051af0',
        '0x6c956587d9fe70032781edcdc626310648575382'
      ])
    })
  })

  describe('and resolving the manager from the marketplace a trade targets', () => {
    let v2: ContractData
    let v3: ContractData
    let v2Amoy: ContractData

    beforeEach(() => {
      v2 = getCouponManager(
        ContractName.OffChainMarketplaceV2,
        ChainId.MATIC_MAINNET
      )
      v3 = getCouponManager(
        ContractName.OffChainMarketplaceV3,
        ChainId.MATIC_MAINNET
      )
      v2Amoy = getCouponManager(
        ContractName.OffChainMarketplaceV2,
        ChainId.MATIC_AMOY
      )
    })

    // Both versions are live on Polygon mainnet during the rollout, each with its own manager.
    it('should pair each version with the manager its contract reports', () => {
      expect([v2.address, v3.address]).toEqual([
        '0x3fd3056ee72a2a85e9392fab3a450e7736536081',
        '0x655fdfa91d69ea49f4ce1a8f7f7e2622c8630813'
      ])
    })

    it('should pair V2 on Amoy with the manager its testnet deployment reports', () => {
      expect(v2Amoy.address).toBe('0xa40b1d129b8906888720686f3a01921ddf37716f')
    })

    it('should throw for V1, which has no manager in this registry', () => {
      expect(() =>
        getCouponManager(
          ContractName.OffChainMarketplace,
          ChainId.MATIC_MAINNET
        )
      ).toThrow(
        `No coupon manager is paired with ${ContractName.OffChainMarketplace}`
      )
    })

    // V2 is deployed on both Ethereum chains but reports the zero address as its manager.
    it('should throw for V2 on Ethereum Mainnet, where the marketplace exists without a manager', () => {
      expect(() =>
        getCouponManager(
          ContractName.OffChainMarketplaceV2,
          ChainId.ETHEREUM_MAINNET
        )
      ).toThrow(
        `Could not get a valid contract for ${ContractName.CouponManagerV2} using chain ${ChainId.ETHEREUM_MAINNET}`
      )
    })

    it('should throw for V2 on Ethereum Sepolia, where the marketplace exists without a manager', () => {
      expect(() =>
        getCouponManager(
          ContractName.OffChainMarketplaceV2,
          ChainId.ETHEREUM_SEPOLIA
        )
      ).toThrow(
        `Could not get a valid contract for ${ContractName.CouponManagerV2} using chain ${ChainId.ETHEREUM_SEPOLIA}`
      )
    })
  })

  describe('and asking for the CollectionDiscountCoupon', () => {
    it('should return the Matic Mainnet coupon both managers allow', () => {
      expect(
        getContract(
          ContractName.CollectionDiscountCoupon,
          ChainId.MATIC_MAINNET
        )
      ).toEqual({
        abi: abis.CollectionDiscountCoupon,
        address: '0xc914507fe297b2dddd1232ac3a8903f1c125e794',
        name: 'CollectionDiscountCoupon',
        version: '1.0.0',
        chainId: ChainId.MATIC_MAINNET
      })
    })

    it('should throw on Ethereum Mainnet, where collections do not exist', () => {
      expect(() =>
        getContract(
          ContractName.CollectionDiscountCoupon,
          ChainId.ETHEREUM_MAINNET
        )
      ).toThrow(
        `Could not get a valid contract for ${ContractName.CollectionDiscountCoupon} using chain ${ChainId.ETHEREUM_MAINNET}`
      )
    })
  })
})
