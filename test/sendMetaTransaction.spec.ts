import { sendMetaTransaction } from '../src/sendMetaTransaction'
import { ContractData, Provider } from '../src/types'
import { ErrorCode } from '../src/errors'
import * as utils from '../src/utils'

jest.mock('../src/utils', () => ({
  ...jest.requireActual('../src/utils'),
  getAccount: jest.fn(),
  getNonce: jest.fn(),
  getSignature: jest.fn(),
  isContract: jest.fn()
}))

const ACCOUNT = '0x1234567890123456789012345678901234567890'
const CONTRACT: ContractData = {
  address: '0xa40b1d129b8906888720686f3a01921ddf37716f',
  name: 'DecentralandMarketplacePolygon',
  version: '1.0.0',
  chainId: 137,
  abi: [
    {
      name: 'executeMetaTransaction',
      type: 'function',
      inputs: [
        { name: 'userAddress', type: 'address' },
        { name: '_functionData', type: 'bytes' },
        { name: '_signature', type: 'bytes' }
      ]
    }
  ]
} as unknown as ContractData

const provider = {} as Provider

/** A relay-server answer. `reason` is what marks the one rejection worth signing again for. */
function relayAnswers(...bodies: object[]) {
  const fetchMock = jest.fn()
  bodies.forEach(body =>
    fetchMock.mockResolvedValueOnce({ status: 200, json: async () => body })
  )
  ;(global as { fetch?: unknown }).fetch = fetchMock
  return fetchMock
}

/** The nonce each successive read reports, so a test can move it between attempts. */
function noncesRead(...values: string[]) {
  const mock = utils.getNonce as jest.Mock
  mock.mockReset()
  values.forEach(v => mock.mockResolvedValueOnce(v))
  return mock
}

beforeEach(() => {
  jest.clearAllMocks()
  ;(utils.getAccount as jest.Mock).mockResolvedValue(ACCOUNT)
  ;(utils.isContract as jest.Mock).mockResolvedValue(false)
  // 65 bytes ending in a valid recovery byte: the version is normalized before the payload is packed.
  ;(utils.getSignature as jest.Mock).mockResolvedValue(`0x${'ab'.repeat(64)}1b`)
  ;(utils.getNonce as jest.Mock).mockResolvedValue('0')
})

describe('#sendMetaTransaction', () => {
  describe('when the relay server rejects the meta-transaction for a stale nonce', () => {
    /**
     * The production failure: a second meta-transaction from the same account, signed over a nonce the chain
     * moved past while the first one was still in flight. The rejection proves nothing was relayed, so
     * signing again is safe — and it is the difference between the caller losing the transaction or not.
     */
    it('should read the nonce again, sign again and relay again, returning the hash', async () => {
      noncesRead('7', '8')
      const fetchMock = relayAnswers(
        {
          ok: false,
          message: 'signed over nonce 7 while the target is at 8',
          code: ErrorCode.INVALID_TRANSACTION,
          reason: 'stale_meta_transaction_nonce'
        },
        { ok: true, txHash: '0xrelayed' }
      )

      await expect(
        sendMetaTransaction(provider, provider, '0xdeadbeef', CONTRACT)
      ).resolves.toBe('0xrelayed')

      expect(fetchMock).toHaveBeenCalledTimes(2)
      expect(utils.getNonce).toHaveBeenCalledTimes(2)
      expect(utils.getSignature).toHaveBeenCalledTimes(2)
    })

    it('should sign the second attempt over the nonce the second read reported', async () => {
      noncesRead('7', '8')
      relayAnswers(
        {
          ok: false,
          message: 'stale',
          code: ErrorCode.INVALID_TRANSACTION,
          reason: 'stale_meta_transaction_nonce'
        },
        { ok: true, txHash: '0xrelayed' }
      )

      await sendMetaTransaction(provider, provider, '0xdeadbeef', CONTRACT)

      const signed = (utils.getSignature as jest.Mock).mock.calls.map(
        ([, , dataToSign]: [unknown, unknown, string]) =>
          JSON.parse(dataToSign).message.nonce
      )
      // Re-reading is the whole point: signing the same nonce twice would be refused the same way twice.
      expect(signed).toEqual([7, 8])
    })

    it('should give up after one retry rather than racing whatever else is submitting', async () => {
      noncesRead('7', '8', '9')
      const fetchMock = relayAnswers(
        {
          ok: false,
          message: 'stale once',
          code: ErrorCode.INVALID_TRANSACTION,
          reason: 'stale_meta_transaction_nonce'
        },
        {
          ok: false,
          message: 'stale twice',
          code: ErrorCode.INVALID_TRANSACTION,
          reason: 'stale_meta_transaction_nonce'
        }
      )

      await expect(
        sendMetaTransaction(provider, provider, '0xdeadbeef', CONTRACT)
      ).rejects.toThrow('stale twice')

      expect(fetchMock).toHaveBeenCalledTimes(2)
    })
  })

  describe('when the relay server rejects it for any other reason', () => {
    it('should not sign again, since only a stale nonce is known to be worth repeating', async () => {
      const fetchMock = relayAnswers({
        ok: false,
        message: 'The meta-transaction signature was not produced by the userAddress it carries.',
        code: ErrorCode.INVALID_TRANSACTION
      })

      await expect(
        sendMetaTransaction(provider, provider, '0xdeadbeef', CONTRACT)
      ).rejects.toThrow('was not produced by the userAddress')

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(utils.getSignature).toHaveBeenCalledTimes(1)
    })
  })

  describe('when the relay server accepts it', () => {
    it('should relay exactly once', async () => {
      const fetchMock = relayAnswers({ ok: true, txHash: '0xfirst' })

      await expect(
        sendMetaTransaction(provider, provider, '0xdeadbeef', CONTRACT)
      ).resolves.toBe('0xfirst')

      expect(fetchMock).toHaveBeenCalledTimes(1)
    })
  })
})
