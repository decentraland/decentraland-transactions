import {
  getCode,
  getSalt,
  hexZeroPad,
  isContract,
  isZeroAddress,
  normalizeSignatureVersion,
  normalizeVersion,
  getOffchainExecuteMetaTransactionData
} from '../src/utils'

describe('#Utils', () => {
  describe('getSalt', () => {
    it('should return bytes32 salt by passing a number', () => {
      expect(getSalt(1)).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )

      expect(getSalt(10)).toBe(
        '0x000000000000000000000000000000000000000000000000000000000000000a'
      )

      expect(getSalt(80001)).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000013881'
      )
    })

    it('should return bytes32 salt by passing a string', () => {
      expect(getSalt('1')).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )

      expect(getSalt('10')).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000010'
      )

      expect(getSalt('80001')).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000080001'
      )
    })

    it('should return bytes32 salt by passing an hexa string', () => {
      expect(getSalt('0x1')).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )

      expect(getSalt('0x10')).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000010'
      )

      expect(getSalt('0x80001')).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000080001'
      )
    })
  })

  describe('getCode', () => {
    it('should send the method "eth_getCode" and the address as the only param', async () => {
      const mockRequest = jest.fn().mockResolvedValue('0x')
      const fakeProvider = {
        request: mockRequest
      }
      await getCode(fakeProvider, '0xcafebabe')
      expect(mockRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'eth_getCode',
          params: ['0xcafebabe', 'latest']
        })
      )
    })
    it('should lowercase the account address when sending it to the provider', async () => {
      const mockRequest = jest.fn().mockResolvedValue('0x')
      const fakeProvider = {
        request: mockRequest
      }
      await getCode(fakeProvider, '0xCAFEBABE')
      expect(mockRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'eth_getCode',
          params: ['0xcafebabe', 'latest']
        })
      )
    })
  })

  describe('isContract', () => {
    it('should return a Promise that resolves to false when bytecode is zero', async () => {
      const mockRequest = jest.fn().mockResolvedValue('0x')
      const fakeProvider = {
        request: mockRequest
      }
      const result = await isContract(fakeProvider, '0xcafebabe')
      expect(result).toBe(false)
    })
    it('should return a Promise that resolves to true when bytecode is non-zero', async () => {
      const mockRequest = jest.fn().mockResolvedValue('0xc0de')
      const fakeProvider = {
        request: mockRequest
      }
      const result = await isContract(fakeProvider, '0xcafebabe')
      expect(result).toBe(true)
    })
    it('should return false for an EIP-7702 delegated EOA', async () => {
      const mockRequest = jest
        .fn()
        .mockResolvedValue(
          '0xef0100000069d8726b7135bbb9cd4c9f8e66b381d00000'
        )
      const fakeProvider = {
        request: mockRequest
      }
      const result = await isContract(fakeProvider, '0xcafebabe')
      expect(result).toBe(false)
    })
  })

  describe('hexZeroPad', () => {
    it('should left pad the received hex string with zeros', () => {
      expect(hexZeroPad('0x')).toBe(
        '0x0000000000000000000000000000000000000000'
      )
      expect(hexZeroPad('0x0')).toBe(
        '0x0000000000000000000000000000000000000000'
      )
      expect(hexZeroPad('0x0000000000000000000000000000000000000000')).toBe(
        '0x0000000000000000000000000000000000000000'
      )
      expect(hexZeroPad('0x1')).toBe(
        '0x0000000000000000000000000000000000000001'
      )
    })
  })

  describe('isZeroAddress', () => {
    it('should return true for zero address', () => {
      expect(isZeroAddress('0x')).toBe(true)
      expect(isZeroAddress('0x0')).toBe(true)
      expect(isZeroAddress('0x0000000000000000000000000000000000000000')).toBe(
        true
      )
    })
    it('should return false for non-zero address', () => {
      expect(isZeroAddress('0x1')).toBe(false)
      expect(isZeroAddress('0x0000000000000000000000000000000000000001')).toBe(
        false
      )
    })
  })

  describe('normalizeSignatureVersion', () => {
    const r = 'a'.repeat(64)
    const s = '1'.repeat(64)

    it('should lift a Ledger v=00 to 1b, leaving r and s untouched', () => {
      expect(normalizeSignatureVersion(`${r}${s}00`)).toBe(`${r}${s}1b`)
    })
    it('should lift a Ledger v=01 to 1c', () => {
      expect(normalizeSignatureVersion(`${r}${s}01`)).toBe(`${r}${s}1c`)
    })
    it('should leave an already-canonical signature alone', () => {
      expect(normalizeSignatureVersion(`${r}${s}1b`)).toBe(`${r}${s}1b`)
      expect(normalizeSignatureVersion(`${r}${s}1c`)).toBe(`${r}${s}1c`)
    })
    it('should pass a non-65-byte (contract/EIP-1271) signature through untouched', () => {
      // Its last byte is not a recovery id; rewriting it would corrupt the signature.
      const blob = 'ab'.repeat(100)
      expect(normalizeSignatureVersion(blob)).toBe(blob)
    })
  })

  describe('getOffchainExecuteMetaTransactionData', () => {
    it('should normalize a Ledger recovery id into the encoded calldata', () => {
      // Regression: the CreditsManager recovers with OpenZeppelin ECDSA, which reverts with
      // ECDSAInvalidSignature() on any v outside {27,28}. A Ledger returns 0/1, so every purchase
      // through that contract failed gas estimation and was never submitted.
      const account = `0x${'11'.repeat(20)}`
      const r = 'a'.repeat(64)
      const s = '1'.repeat(64)
      const txData = getOffchainExecuteMetaTransactionData(
        account,
        `0x${r}${s}00`,
        `0x${'cd'.repeat(4)}`
      )
      expect(txData).toContain(`${r}${s}1b`)
      expect(txData).not.toContain(`${r}${s}00`)
    })
  })

  describe('normalizeVersion', () => {
    it('should return "1b" when v="1b"', () => {
      expect(normalizeVersion('1b')).toBe('1b')
    })
    it('should return "1c" when v="1c"', () => {
      expect(normalizeVersion('1c')).toBe('1c')
    })
    it('should return "1b" when v="0"', () => {
      expect(normalizeVersion('0')).toBe('1b')
    })
    it('should return "1c" when v="1"', () => {
      expect(normalizeVersion('1')).toBe('1c')
    })
    it('should throw when v="2"', () => {
      expect(() => normalizeVersion('2')).toThrow()
    })
  })
})
