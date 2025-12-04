import { getConfiguration } from '../src/configuration'

describe('#getConfiguration', () => {
  it('should return the configuration using the environment', () => {
    expect(getConfiguration()).toEqual({
      serverURL: 'https://transactions-api.decentraland.io/v1'
    })
  })
})
