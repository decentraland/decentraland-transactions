export const NATIVE_TOKEN = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

// Iterative routing parameters used by AxelarProvider when the destination call
// has a fixed price (trade accept, executeOrder, mint, name register). The lib
// re-quotes Squid until route.estimate.toAmountMin >= price × (1 + safety),
// bumping fromAmount each iteration. If fromAmount would need to grow beyond
// MAX_FROM_AMOUNT_INCREASE_BPS over the caller's value, an
// InsufficientLiquidityError is thrown so the consumer can block the purchase.

// Margin applied on top of the destination price when validating toAmountMin.
// 0.5% absorbs rounding and tiny extra fees that may occur between quote and
// execution.
export const SAFETY_MARGIN_BPS = 50

// Maximum % increase over the caller-provided fromAmount before giving up.
// Acts as the user-facing slippage cap: if the destination chain's MANA pools
// require more than 5% extra MANA on the source chain to guarantee delivery,
// the route is rejected. The marketplace UI can catch
// InsufficientLiquidityError and block the buy button.
export const MAX_FROM_AMOUNT_INCREASE_BPS = 500

// Hard ceiling on re-quote attempts. Convergence is typically 0–2 iterations
// since toAmountMin scales near-linearly with fromAmount for normal trade sizes.
export const MAX_QUOTE_ITERATIONS = 4

export class InsufficientLiquidityError extends Error {
  public readonly toAmountMin: string
  public readonly requiredMin: string
  public readonly maxFromAmount: string

  constructor(
    toAmountMin: string,
    requiredMin: string,
    maxFromAmount: string
  ) {
    super(
      `Cross-chain route cannot guarantee delivery of ${requiredMin} (got ${toAmountMin} as toAmountMin) within ${maxFromAmount} max fromAmount`
    )
    this.name = 'InsufficientLiquidityError'
    this.toAmountMin = toAmountMin
    this.requiredMin = requiredMin
    this.maxFromAmount = maxFromAmount
  }
}
