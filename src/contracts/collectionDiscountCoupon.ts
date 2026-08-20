import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

// Collections only live on Polygon, so this coupon has no Ethereum deployment.
export const collectionDiscountCoupon = {
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.CollectionDiscountCoupon,
    address: '0x4ee8f6b87f4917a3bbc7c8bb3a06db8555f83db9',
    name: 'CollectionDiscountCoupon',
    chainId: ChainId.MATIC_AMOY
  }
}
