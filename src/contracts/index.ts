import { ChainId } from '@dcl/schemas'
import { ContractName, ContractData } from '../types'

import { bid } from './bid'
import { bidV2 } from './bidV2'
import { collectionFactory } from './collectionFactory'
import { collectionFactoryV3 } from './collectionFactoryV3'
import { collectionManager } from './collectionManager'
import { collectionStore } from './collectionStore'
import { committee } from './committee'
import { erc20 } from './erc20'
import { erc721 } from './erc721'
import { erc721CollectionV2 } from './erc721CollectionV2'
import { forwarder } from './forwarder'
import { manaToken } from './manaToken'
import { marketplace } from './marketplace'
import { marketplaceV2 } from './marketplaceV2'
import { rarities } from './rarities'
import { tiers } from './tiers'
import { thirdPartyRegistry } from './thirdPartyRegistry'
import { chainlinkOracle } from './chainlinkOracle'
import { raritiesWithOracle } from './raritiesWithOracle'
import { rentals } from './rentals'
import { dclRegistrar } from './dclRegistrar'
import { dclController } from './dclController'
import { dclControllerV2 } from './dclControllerV2'
import { offChainMarketplace } from './offChainMarketplace'
import { offChainMarketplaceV2 } from './offChainMarketplaceV2'
import { offChainMarketplaceV3 } from './offChainMarketplaceV3'
import { creditsManager } from './creditsManager'
import { couponManager } from './couponManager'
import { couponManagerV2 } from './couponManagerV2'
import { couponManagerV3 } from './couponManagerV3'
import { collectionDiscountCoupon } from './collectionDiscountCoupon'

const contracts: Record<
  ContractName,
  Partial<Record<ChainId, ContractData>>
> = {
  [ContractName.Bid]: bid,
  [ContractName.BidV2]: bidV2,
  [ContractName.CollectionFactory]: collectionFactory,
  [ContractName.CollectionFactoryV3]: collectionFactoryV3,
  [ContractName.CollectionManager]: collectionManager,
  [ContractName.CollectionStore]: collectionStore,
  [ContractName.Committee]: committee,
  [ContractName.ERC20]: erc20,
  [ContractName.ERC721]: erc721,
  [ContractName.ERC721CollectionV2]: erc721CollectionV2,
  [ContractName.Forwarder]: forwarder,
  [ContractName.MANAToken]: manaToken,
  [ContractName.Marketplace]: marketplace,
  [ContractName.MarketplaceV2]: marketplaceV2,
  [ContractName.Rarities]: rarities,
  [ContractName.RaritiesWithOracle]: raritiesWithOracle,
  [ContractName.ThirdPartyRegistry]: thirdPartyRegistry,
  [ContractName.Tiers]: tiers,
  [ContractName.ChainlinkOracle]: chainlinkOracle,
  [ContractName.Rentals]: rentals,
  [ContractName.DCLRegistrar]: dclRegistrar,
  [ContractName.DCLController]: dclController,
  [ContractName.DCLControllerV2]: dclControllerV2,
  [ContractName.OffChainMarketplace]: offChainMarketplace,
  [ContractName.OffChainMarketplaceV2]: offChainMarketplaceV2,
  [ContractName.OffChainMarketplaceV3]: offChainMarketplaceV3,
  [ContractName.CreditsManager]: creditsManager,
  [ContractName.CouponManager]: couponManager,
  [ContractName.CouponManagerV2]: couponManagerV2,
  [ContractName.CouponManagerV3]: couponManagerV3,
  [ContractName.CollectionDiscountCoupon]: collectionDiscountCoupon
}

export function getContract(
  contractName: ContractName,
  chainId: ChainId
): ContractData {
  const contract = contracts[contractName]
  if (!contract) {
    throw new Error(`Could not get a valid contract for name: ${contractName}`)
  }

  if (!contract[chainId]) {
    throw new Error(
      `Could not get a valid contract for ${contractName} using chain ${chainId}`
    )
  }

  return contract[chainId]!
}

/** Each off-chain marketplace version and the coupon manager it trusts (`couponManager()`). */
const COUPON_MANAGER_BY_MARKETPLACE: Partial<Record<
  ContractName,
  ContractName
>> = {
  [ContractName.OffChainMarketplaceV2]: ContractName.CouponManagerV2,
  [ContractName.OffChainMarketplaceV3]: ContractName.CouponManagerV3
}

/**
 * The coupon manager a marketplace redeems coupons through.
 *
 * A coupon is signed against one manager's EIP-712 domain and is only redeemable on the marketplace
 * wired to that manager, so the manager is a property of the marketplace, not of the chain: while two
 * versions are live on a chain, each has its own. Resolve it from the marketplace the trade targets.
 *
 * @param marketplace - The off-chain marketplace version, e.g. `getContractName(trade.contract)`.
 * @param chainId - The chain the trade settles on.
 * @throws When the version has no coupon manager (V1) or it is not deployed on the chain.
 */
export function getCouponManager(
  marketplace: ContractName,
  chainId: ChainId
): ContractData {
  const managerName = COUPON_MANAGER_BY_MARKETPLACE[marketplace]
  if (!managerName) {
    throw new Error(`No coupon manager is paired with ${marketplace}`)
  }
  return getContract(managerName, chainId)
}

export function getContractName(address: string): ContractName {
  for (const contractName in contracts) {
    for (const chainId in contracts[contractName as ContractName]) {
      const contract =
        contracts[contractName as ContractName][(chainId as unknown) as ChainId]

      if (contract?.address.toLowerCase() === address.toLowerCase()) {
        return contractName as ContractName
      }
    }
  }
  throw new Error(`Could not get a valid contract name for address ${address}`)
}
