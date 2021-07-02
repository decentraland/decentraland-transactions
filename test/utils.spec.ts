import { expect } from 'chai'
import { fake } from 'sinon'
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
      expect(getSalt(1)).to.eq(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )

      expect(getSalt(10)).to.eq(
        '0x000000000000000000000000000000000000000000000000000000000000000a'
      )

      expect(getSalt(80001)).to.eq(
        '0x0000000000000000000000000000000000000000000000000000000000013881'
      )
    })

    it('should return bytes32 salt by passing a string', () => {
      expect(getSalt('1')).to.eq(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )

      expect(getSalt('10')).to.eq(
        '0x0000000000000000000000000000000000000000000000000000000000000010'
      )

      expect(getSalt('80001')).to.eq(
        '0x0000000000000000000000000000000000000000000000000000000000080001'
      )
    })

    it('should return bytes32 salt by passing an hexa string', () => {
      expect(getSalt('0x1')).to.eq(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )

      expect(getSalt('0x10')).to.eq(
        '0x0000000000000000000000000000000000000000000000000000000000000010'
      )

      expect(getSalt('0x80001')).to.eq(
        '0x0000000000000000000000000000000000000000000000000000000000080001'
      )
    })
  })

  describe('getCode', () => {
    it('should send the method "eth_getCode" and the address as the only param', async () => {
      const fakeProvider = {
        request: fake.returns('0x')
      }
      await getCode(fakeProvider, '0xcafebabe')
      expect(fakeProvider.request.args[0][0].method).to.equal('eth_getCode')
      expect(fakeProvider.request.args[0][0].params).to.have.same.members([
        '0xcafebabe',
        'latest'
      ])
    })
    it('should lowercase the account address when sending it to the provider', async () => {
      const fakeProvider = {
        request: fake.returns('0x')
      }
      await getCode(fakeProvider, '0xCAFEBABE')
      expect(fakeProvider.request.args[0][0].params).to.have.same.members([
        '0xcafebabe',
        'latest'
      ])
    })
  })

  describe('isContract', () => {
    it('should return a Promise that resolves to false when bytecode is zero', async () => {
      const fakeProvider = {
        request: fake.returns('0x')
      }
      const result = await isContract(fakeProvider, '0xcafebabe')
      expect(result).to.be.false
    })
    it('should return a Promise that resolves to true when bytecode is non-zero', async () => {
      const fakeProvider = {
        request: fake.returns('0xc0de')
      }
      const result = await isContract(fakeProvider, '0xcafebabe')
      expect(result).to.be.true
    })
  })

  describe('hexZeroPad', () => {
    it('should left pad the received hex string with zeros', () => {
      expect(hexZeroPad('0x')).to.eq(
        '0x0000000000000000000000000000000000000000'
      )
      expect(hexZeroPad('0x0')).to.eq(
        '0x0000000000000000000000000000000000000000'
      )
      expect(hexZeroPad('0x0000000000000000000000000000000000000000')).to.eq(
        '0x0000000000000000000000000000000000000000'
      )
      expect(hexZeroPad('0x1')).to.eq(
        '0x0000000000000000000000000000000000000001'
      )
    })
  })

  describe('isZeroAddress', () => {
    it('should return true for zero address', () => {
      expect(isZeroAddress('0x')).to.be.true
      expect(isZeroAddress('0x0')).to.be.true
      expect(isZeroAddress('0x0000000000000000000000000000000000000000')).to.be
        .true
    })
    it('should return false for non-zero address', () => {
      expect(isZeroAddress('0x1')).to.be.false
      expect(isZeroAddress('0x0000000000000000000000000000000000000001')).to.be
        .false
    })
  })

  describe('normalizeVersion', () => {
    it('should return "1b" when v="1b"', () => {
      expect(normalizeVersion('1b')).to.equal('1b')
    })
    it('should return "1c" when v="1c"', () => {
      expect(normalizeVersion('1c')).to.equal('1c')
    })
    it('should return "1b" when v="0"', () => {
      expect(normalizeVersion('0')).to.equal('1b')
    })
    it('should return "1c" when v="1"', () => {
      expect(normalizeVersion('1')).to.equal('1c')
    })
    it('should throw when v="2"', () => {
      expect(() => normalizeVersion('2')).to.throw
    })
  })
})
