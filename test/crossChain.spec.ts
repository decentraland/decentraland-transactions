// Stub the Squid SDK at the module level so AxelarProvider's constructor does
// not attempt network calls during init(). Tests replace `provider.squid`
// with a per-case mock to control getRoute responses.
jest.mock('@0xsquid/sdk', () => ({
  Squid: jest.fn().mockImplementation(() => ({
    initialized: false,
    init: jest.fn().mockResolvedValue(undefined),
    getRoute: jest.fn(),
    chains: [],
    tokens: []
  }))
}))

import { AxelarProvider } from '../src/crossChain/AxelarProvider'
import {
  InsufficientLiquidityError,
  MAX_QUOTE_ITERATIONS,
  SAFETY_MARGIN_BPS
} from '../src/crossChain/utils'

describe('AxelarProvider', () => {
  describe('#getSafeRoute', () => {
    let provider: AxelarProvider
    let mockGetRoute: jest.Mock

    // The trade size used across most tests; chosen to make the slippage math
    // easy to follow (price = 1000, requiredMin = 1005, maxFromAmount = 1050).
    const initialFromAmount = '1000'
    const destinationPrice = '1000'

    // Minimum delivery that satisfies requiredMin = price × (1 + 0.5%) = 1005.
    const SUFFICIENT_TO_AMOUNT_MIN = '1005'

    function buildRouteRequest(
      fromAmount: string = initialFromAmount,
      extra: Record<string, unknown> = {}
    ) {
      return {
        fromAddress: '0x0000000000000000000000000000000000000001',
        fromAmount,
        fromToken: '0x0000000000000000000000000000000000000002',
        fromChain: '1',
        toToken: '0x0000000000000000000000000000000000000003',
        toChain: '137',
        toAddress: '0x0000000000000000000000000000000000000004',
        enableBoost: true,
        postHook: { calls: [] },
        ...extra
      } as any
    }

    function fakeRouteResponse(toAmountMin: string) {
      return {
        route: {
          estimate: { toAmount: toAmountMin, toAmountMin },
          params: { fromAmount: '0' }
        }
      }
    }

    // Helper: invoke the private method via cast. Encapsulation is enforced
    // at the type level for callers; tests need direct access to exercise
    // every branch without standing up the full destination-call mocks.
    function callGetSafeRoute(
      request: ReturnType<typeof buildRouteRequest>,
      price: string = destinationPrice
    ): Promise<unknown> {
      return (provider as any).getSafeRoute(request, price)
    }

    beforeEach(() => {
      provider = new AxelarProvider('http://test.invalid')
      mockGetRoute = jest.fn()
      // Replace the squid instance with a minimal mock; the real one is also
      // calling init() in the background which we don't need for these tests.
      ;(provider as any).squid = {
        initialized: true,
        getRoute: mockGetRoute
      }
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('when toAmountMin meets requiredMin on the first quote', () => {
      it('should return the route without re-quoting', async () => {
        mockGetRoute.mockResolvedValueOnce(
          fakeRouteResponse(SUFFICIENT_TO_AMOUNT_MIN)
        )

        const route = await callGetSafeRoute(buildRouteRequest())

        expect(route).toBeDefined()
        expect(mockGetRoute).toHaveBeenCalledTimes(1)
      })
    })

    describe('when the first quote is short but the bumped quote meets requiredMin', () => {
      it('should return the second route after bumping fromAmount', async () => {
        mockGetRoute
          .mockResolvedValueOnce(fakeRouteResponse('990'))
          .mockResolvedValueOnce(fakeRouteResponse(SUFFICIENT_TO_AMOUNT_MIN))

        const route = await callGetSafeRoute(buildRouteRequest())

        expect(route).toBeDefined()
        expect(mockGetRoute).toHaveBeenCalledTimes(2)

        const firstFromAmount = BigInt(mockGetRoute.mock.calls[0][0].fromAmount)
        const secondFromAmount = BigInt(
          mockGetRoute.mock.calls[1][0].fromAmount
        )
        expect(secondFromAmount).toBeGreaterThan(firstFromAmount)
      })
    })

    describe('when toAmountMin remains just below requiredMin every iteration', () => {
      it('should call squid.getRoute MAX_QUOTE_ITERATIONS times and throw InsufficientLiquidityError', async () => {
        // Mock toAmountMin = 1003 (below 1005) but high enough that the bump
        // stays under maxFromAmount (1050) on every iteration. Bump factor =
        // 1005 / 1003 ≈ 1.002, so fromAmount grows by ~0.2% per call and
        // never reaches the 5% cap before iterations are exhausted.
        mockGetRoute.mockResolvedValue(fakeRouteResponse('1003'))

        await expect(callGetSafeRoute(buildRouteRequest())).rejects.toThrow(
          InsufficientLiquidityError
        )
        expect(mockGetRoute).toHaveBeenCalledTimes(MAX_QUOTE_ITERATIONS)
      })
    })

    describe('when the proportional bump on the first iteration would exceed MAX_FROM_AMOUNT_INCREASE_BPS', () => {
      it('should throw InsufficientLiquidityError after a single quote', async () => {
        // toAmountMin = 100 → bump = 1000 × 1005 / 100 = 10050, which is far
        // above maxFromAmount = 1050.
        mockGetRoute.mockResolvedValueOnce(fakeRouteResponse('100'))

        const errPromise = callGetSafeRoute(buildRouteRequest())

        await expect(errPromise).rejects.toThrow(InsufficientLiquidityError)
        expect(mockGetRoute).toHaveBeenCalledTimes(1)
      })
    })

    describe('when liquidity degrades on a later iteration so the bump exceeds the max', () => {
      it('should throw InsufficientLiquidityError mid-loop without exhausting iterations', async () => {
        // First quote: tiny shortfall → small bump (~0.2%), keeps going.
        // Second quote: liquidity collapses → bump would be ~6.6%, over cap.
        mockGetRoute
          .mockResolvedValueOnce(fakeRouteResponse('1003')) // small shortfall
          .mockResolvedValueOnce(fakeRouteResponse('950')) // big shortfall

        await expect(callGetSafeRoute(buildRouteRequest())).rejects.toThrow(
          InsufficientLiquidityError
        )
        expect(mockGetRoute).toHaveBeenCalledTimes(2)
      })
    })

    describe('when Squid returns a degenerate route with toAmountMin = 0', () => {
      it('should throw InsufficientLiquidityError without dividing by zero', async () => {
        mockGetRoute.mockResolvedValueOnce(fakeRouteResponse('0'))

        await expect(callGetSafeRoute(buildRouteRequest())).rejects.toThrow(
          InsufficientLiquidityError
        )
        expect(mockGetRoute).toHaveBeenCalledTimes(1)
      })
    })

    describe('when the request includes slippage', () => {
      it('should forward a non-zero slippage to squid.getRoute', async () => {
        mockGetRoute.mockResolvedValueOnce(
          fakeRouteResponse(SUFFICIENT_TO_AMOUNT_MIN)
        )

        await callGetSafeRoute(buildRouteRequest('1000', { slippage: 0.5 }))

        expect(mockGetRoute).toHaveBeenCalledWith(
          expect.objectContaining({ slippage: 0.5 })
        )
      })

      it('should forward slippage = 0 instead of dropping it', async () => {
        mockGetRoute.mockResolvedValueOnce(
          fakeRouteResponse(SUFFICIENT_TO_AMOUNT_MIN)
        )

        await callGetSafeRoute(buildRouteRequest('1000', { slippage: 0 }))

        expect(mockGetRoute).toHaveBeenCalledWith(
          expect.objectContaining({ slippage: 0 })
        )
      })
    })

    describe('when the requiredMin is computed', () => {
      it('should apply SAFETY_MARGIN_BPS on top of the destination price', async () => {
        // For price = 10000 and SAFETY_MARGIN_BPS = 50 (0.5%), requiredMin
        // becomes 10050. A toAmountMin of 10049 should fail and trigger a
        // bump; 10050 should succeed without bumping.
        const price = '10000'
        const justBelow = String(
          10000 + Math.floor((10000 * SAFETY_MARGIN_BPS) / 10000) - 1
        )
        const exactly = String(
          10000 + Math.floor((10000 * SAFETY_MARGIN_BPS) / 10000)
        )

        mockGetRoute
          .mockResolvedValueOnce(fakeRouteResponse(justBelow))
          .mockResolvedValueOnce(fakeRouteResponse(exactly))

        const route = await callGetSafeRoute(
          buildRouteRequest(initialFromAmount),
          price
        )

        expect(route).toBeDefined()
        expect(mockGetRoute).toHaveBeenCalledTimes(2)
      })
    })
  })
})

describe('InsufficientLiquidityError', () => {
  describe('when constructed and re-thrown across the prototype chain', () => {
    it('should remain detectable via instanceof after extending Error', () => {
      const err = new InsufficientLiquidityError('100', '200', '300')

      expect(err).toBeInstanceOf(InsufficientLiquidityError)
      expect(err).toBeInstanceOf(Error)
    })

    it('should expose the failure context as readonly fields', () => {
      const err = new InsufficientLiquidityError('100', '200', '300')

      expect(err.toAmountMin).toBe('100')
      expect(err.requiredMin).toBe('200')
      expect(err.maxFromAmount).toBe('300')
      expect(err.name).toBe('InsufficientLiquidityError')
    })
  })
})

