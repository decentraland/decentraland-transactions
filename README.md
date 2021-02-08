<img src="https://ui.decentraland.org/decentraland_256x256.png" height="128" width="128" />

# Decentraland Transactions

Send meta transactions

# Table of contents

- [API](#api)
  - [sendMetaTransaction](#sendMetaTransaction)
  - [contracts](#contracts)
    - [getManaContract](#getManaContract)
  - [Types](#types)
    - [Configuration](#Configuration)
    - [Provider](#Provider)
    - [ChainId](#ChainId)
    - [ContractData](#ContractData)
    - [DataToSign](#DataToSign)
    - [DomainData](#DomainData)
- [Example](#example)
- [Development](#development)
- [Copyright](#copyright)

### API

The API consists of one function at the moment, which is all you need to send meta transactions. You might also choose to import [pre-loaded contract configurations](#contracts) or some [types](#types).

## sendMetaTransaction

Sends a meta transaction using a relay server. It's provider agnostic, so it'll take the providers it needs as parameters. The [Provider](#Provider) only has to conform to the required interface found on types. See the [Configuration](#Configuration) type for information on what values you can override.

**Definition**

```typescript
async function sendMetaTransaction(
  l1Provider: Provider,
  l2Provider: Provider,
  functionSignature: string,
  contractData: ContractData,
  partialConfiguration: Partial<Configuration> = {}
): Promise<string>
```

**Usage**

Using [ethers](https://github.com/ethers-io/ethers.js) for the providers

```typescript
import { ethers } from 'ethers'

const manaConfig = contracts.getManaContract(ChainId.MATIC_TESTNET)
const manaContract = new ethers.Contract(manaConfig.address, manaConfig.abi, provider)

const txHash = await sendMetaTransaction(
  new ethers.providers.Web3Provider(window.ethereum),
  new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today'),
  manaContract.pupulateTransaction.transfer(to, value),
  manaConfig
  // ,{ serverURL: 'override.url' }
)
```

## contracts

Collection of useful Decentraland contracts for the different Ethereum [chains](#ChainId). It contains all the information necessary to call `sendMetaTransaction`. It returns a [ContractData](#ContractData) object

```typescript
import { contracts } from 'decentraland-transactions'
```

### getManaContract

**Definition**

```typescript
function getManaContract(chainId: ChainId): ContractData
```

**Usage**

```typescript
contracts.getManaContract(ChainId.ROPSTEN)
```


## Types

### Configuration

```typescript
type Configuration = {
  serverURL: string
}
```

Check [configuration.ts](https://github.com/decentraland/decentraland-transactions/blob/master/src/configuration.ts) to get an up to date snapshot of the current configuration values.

### Provider

Defines the minimun required interface for a Provider. It tries to accomodate for different lib implementations

```typescript
export interface EIPProvider {
  request: (reqArgs: { method: string; params?: any[] }) => Promise<any>
  send?: (method: string, params?: any[]) => Promise<any>
}
export interface LegacyProvider {
  send: (method: string, params: any[]) => Promise<any>
}
export type Provider = EIPProvider | LegacyProvider
```

### ChainId

Different L1 and L2 chains

```typescript
enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  MATIC_TESTNET = 13881,
  MATIC_MAINNET = 89
}
```

### ContractData

Represents all the information necessary to interact with a contract

```typescript
type ContractData = {
  abi: object[]
  address: string
  name: string
  version: string
  chainId: ChainId
}
```

### DataToSign

```typescript
type DataToSign = {
  types: {
    EIP712Domain: DomainType[]
    MetaTransaction: MetaTransactionType[]
  }
  domain: DomainData
  primaryType: 'MetaTransaction'
  message: {
    nonce: number
    from: string
    functionSignature: FunctionSignature
  }
}
```

### DomainData

```typescript
type DomainData = {
  name: string
  version: string
  verifyingContract: string
  salt: string
}
```

# Example

# Example use

Example using [decentraland-connect](https://github.com/decentraland/decentraland-connect) and [ethers](https://github.com/ethers-io/ethers.js) to get the providers

```typescript
import { connection, ProviderType } from 'decentraland-connect'
import { sendMetaTransaction } from 'decentraland-transactions'

async function transferMana() {
  try {
    const { provider } = await connection.connect(ProviderType.INJECTED)

    const txHash = await sendMetaTransaction(
      // Connected wallet provider
      provider,
      // L2 matic provider
      new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today'),
      // Function signature
      '0xa9059cbb000000000000000000000000a8d82b0bf686eee78eb5ec882cac98fdd1335ef50000000000000000000000000000000000000000000000000000000000000001',
      // Mana contract for MATIC_TESTNET
      contracts.getManaContract(ChainId.MATIC_TESTNET)
    )

    console.log('Result tx hash', txHash)
  } catch (error) {
    console.error('An error occurred sending the meta tx', error)
  }
}
```

# Development

To run the project you need to

```bash
npm i
npm run test
npm run build
```

you can also check the test report using

```bash
npm run test:report
```

# Copyright

This repository is protected with a standard Apache 2 license. See the terms and conditions in the [LICENSE](https://github.com/decentraland/decentraland-transactions/blob/master/LICENSE) file.
