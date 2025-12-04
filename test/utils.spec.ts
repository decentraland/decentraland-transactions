import {
  getCode,
  getSalt,
  hexZeroPad,
  isContract,
  isZeroAddress,
  normalizeVersion
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
