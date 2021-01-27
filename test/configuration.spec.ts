import { expect } from 'chai'
import { getConfiguration } from '../src/configuration'

describe('#getConfiguration', () => {
  it('should return the configuration using the environment', () => {
    expect(getConfiguration()).to.deep.eq({
      serverURL: 'https://transactions-api.decentraland.io/v1', // TODO: From env?
      websocketProvider: 'wss://ws-mumbai.matic.today'
    })
  })
})
