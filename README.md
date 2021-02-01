<img src="https://ui.decentraland.org/decentraland_256x256.png" height="128" width="128" />

# Decentraland Transactions

Send meta transactions

# Table of contents

- [API](#api)
  - [sendMetaTransactoin](#ConnectionManager)
  - [contracts](#contracts)
    - [getManaContract](#getManaContract)
  - [utils](#utils)
    - [getAccount](#getAccount)
    - [getSignature](#getSignature)
    - [getExecuteMetaTransactionData](#getExecuteMetaTransactionData)
    - [getNonce](#getNonce)
    - [getSalt](#getSalt)
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

The API consists in one function at the moment, which is all you need to send meta transactions. You might also need to import some types and choose to use an utility function.

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

const txHash = await sendMetaTransaction(
  new ethers.providers.Web3Provider(window.ethereum),
  new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today'),
  '0xa9059cbb000000000000000000000000a8d82b0bf686eee78eb5ec882cac98fdd1335ef50000000000000000000000000000000000000000000000000000000000000001',
  contracts.getManaContract(ChainId.MATIC_TESTNET)
  // ,{ serverURL: 'override.url' }
)
```

## contracts

Collection of useful Decentraland contracts for the different Ethereum [chains](#ChainId). It contains all the information necessary to call `sendMetaTransaction`. It returns a [ContractData](#ContractData) object

```typescript
import { contracts } from 'decentraland-transactions
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

## utils

Set of utility functions to interact with the L1 and L2 blockchain. Exported as `utils`

```typescript
import { utils } from 'decentraland-transactions
```

### getAccount

Gets the connected wallet address

**Definition**

```typescript
async function getAccount(provider: Provider): Promise<string>
```

**Usage**

```typescript
await getAccount(new ethers.providers.Web3Provider(window.ethereum)) // => '0x1d9aa2025b67f0f21d1603ce521bda7869098f8a'
```

### getSignature

**Definition**

Signs the data provided as the last argument, so it can be sent later. You can check [DataToSign](#DataToSign) for a guide on the data you could sign.

```typescript
async function getSignature(
  provider: Provider,
  account: string,
  dataToSign: string
): Promise<string>
```

**Usage**

```typescript
await getSignature(
  new ethers.providers.Web3Provider(window.ethereum),
  '0x1d9aa2025b67f0f21d1603ce521bda7869098f8a',
  JSON.stringify(dataToSign)
) // => '0xe60153d52e1bb286ba8ff91c2ba4d5cd779061234cf0a8b199844d1f4fda81233273312c8ac60b4553a8856223488405ab169a18a2c4c88124a56809edc928f11c'
```

### getExecuteMetaTransactionData

Get's the data to be sent as a transaction payload usually via an RPC `eth_call` but used via a relay server.

**Definition**

```typescript
function getExecuteMetaTransactionData(
  account: string,
  fullSignature: string,
  functionSignature: string
): string
```

**Usage**

```typescript
getExecuteMetaTransactionData(
  '0x1d9aa2025b67f0f21d1603ce521bda7869098f8a',
  '0xe60153d52e1bb286ba8ff91c2ba4d5cd779061234cf0a8b199844d1f4fda81233273312c8ac60b4553a8856223488405ab169a18a2c4c88124a56809edc928f11c', // from getSignature()
  '0xa9059cbb000000000000000000000000a8d82b0bf686eee78eb5ec882cac98fdd1335ef50000000000000000000000000000000000000000000000000000000000000001'
) // => 0x0c53c51c0000000000000000000000001d9aa2025b67f0f21d1603ce521bda7869098f8a00000000000000000000000000000000000000000000000000000000000000a0b55ff9b75bc7adb0e6ac3e81d3fc2229b374659d8f9088dfd7a54be7af8e546577d0b43e6c49537f30bc7c6369aea42615e17456bbf3ad366a53f46aeedf5432000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000044a9059cbb000000000000000000000000a8d82b0bf686eee78eb5ec882cac98fdd1335ef5000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000
```

### getNonce

Get's the nonce for the next transaction to be sent for an specific contract. It's used behind the scenes to figure out the nonce for the L2 contract.

**Definition**

```typescript
async function getNonce(
  provider: Provider,
  account: string,
  contractAddress: string
): Promise<string>
```

**Usage**

```typescript
await getNonce(
  new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today'),
  '0x1d9aa2025b67f0f21d1603ce521bda7869098f8a',
  contracts.getManaContract(ChainId.MATIC_TESTNET).address
) // ==> '0x0000000000000000000000000000000000000000000000000000000000000010'
```

### getSalt

**Definition**

```typescript
function getSalt(chainId: number | string): string
```

**Usage**

```typescript
getSalt(ChainId.MAINNET) // => '0x0000000000000000000000000000000000000000000000000000000000000001'
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
