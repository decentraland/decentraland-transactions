import {
  getAccount,
  getNonce,
  getSignature,
  getExecuteMetaTransactionData,
  getSalt,
  isContract
} from './utils'
import { getConfiguration } from './configuration'
import {
  Provider,
  Configuration,
  DataToSign,
  ContractData,
  DomainData,
  DOMAIN_TYPE,
  META_TRANSACTION_TYPE
} from './types'
import { ErrorCode, MetaTransactionError } from './errors'

/**
 * Send a meta transaction using a relay server
 * @param provider Which network you are connected to and therefore where the meta transaction will be signed
 * @param metaTransactionProvider Where the meta transaction will be executed
 * @param functionSignature Hexa of the transaction data you want to execute
 * @param contractData Related contract data necessary to execute the transaction. Check getContract from this same package
 * @param partialConfiguration Configurable params like which relay server to use
 */
export async function sendMetaTransaction(
  provider: Provider,
  metaTransactionProvider: Provider,
  functionSignature: string,
  contractData: ContractData,
  partialConfiguration: Partial<Configuration> = {}
): Promise<string> {
  const configuration = {
    ...getConfiguration(),
    ...partialConfiguration
  }

  if (!contractData.address.trim()) {
    throw new MetaTransactionError(
      `The contract address for ${contractData.name} is empty. You're probably trying to get a proxy contract. Try adding an address to the result of getContract`,
      ErrorCode.INVALID_ADDRESS
    )
  }

  try {
    const account = await getAccount(provider)

    if (await isContract(provider, account)) {
      throw new MetaTransactionError(
        'Contract accounts are not supported',
        ErrorCode.CONTRACT_ACCOUNT
      )
    }

    const nonce = await getNonce(
      metaTransactionProvider,
      account,
      contractData.address
    )
    const salt = getSalt(contractData.chainId)

    const domainData = getDomainData(salt, contractData)
    const dataToSign = getDataToSign(
      account,
      nonce,
      functionSignature,
      domainData
    )
    const signature = await getSignature(
      provider,
      account,
      JSON.stringify(dataToSign)
    )

    const txData = getExecuteMetaTransactionData(
      account,
      signature,
      functionSignature
    )

    const response: Response = await fetch(
      `${configuration.serverURL}/transactions`,
      {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionData: {
            from: account,
            params: [contractData.address, txData]
          }
        }),
        method: 'POST'
      }
    )

    const body:
      | { ok: false; message: string; code: ErrorCode }
      | { ok: true; txHash: string } = await response.json()

    if (!response.ok) {
      throw new Error(`HTTP Error. Status: ${response.status}.`)
    }

    if (body.ok === false) {
      throw new MetaTransactionError(body.message, body.code)
    }

    return body.txHash
  } catch (err) {
    const error = err as Error

    if (error instanceof MetaTransactionError) {
      throw error
    }

    // User denied error
    const isUserDenied =
      error.message.indexOf('User denied message signature') !== -1
    if (isUserDenied) {
      throw new MetaTransactionError(error.message, ErrorCode.USER_DENIED)
    }

    // Other errors
    console.warn(
      'An error occurred trying to send the meta transaction. Error:',
      error.message
    )
    throw new MetaTransactionError(error.message, ErrorCode.UNKNOWN)
  }
}

function getDataToSign(
  account: string,
  nonce: string,
  functionSignature: string,
  domainData: DomainData
): DataToSign {
  return {
    types: {
      EIP712Domain: DOMAIN_TYPE,
      MetaTransaction: META_TRANSACTION_TYPE
    },
    domain: domainData,
    primaryType: 'MetaTransaction',
    message: {
      nonce: parseInt(nonce, 16),
      from: account,
      functionSignature: functionSignature
    }
  }
}

function getDomainData(salt: string, contractData: ContractData): DomainData {
  return {
    name: contractData.name,
    version: contractData.version,
    verifyingContract: contractData.address,
    salt
  }
}
