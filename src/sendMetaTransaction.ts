import fetch from 'cross-fetch'
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

    console.log('---->', `${configuration.serverURL}/transactions`)
    const res: Response = await fetch(
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

    const { ok, txHash, message } = (await res.json()) as {
      ok: boolean
      txHash: string
      message?: string
    }

    if (!res.ok || !ok) {
      throw new Error(`HTTP Error. Status: ${res.statusText}. Body: ${message}`)
    }

    return txHash
  } catch (error) {
    // User denied error
    const isUserDenied =
      error.message.indexOf('User denied message signature') !== -1
    if (isUserDenied) {
      throw new MetaTransactionError(error.message, ErrorCode.USER_DENIED)
    }

    // Check for a minimum sale price error.
    // This is not ideal and depends on the transactions-server's implementation of InvalidSalePriceError's message
    const isSalePriceTooLowError =
      error.message.indexOf(
        "The transaction data contains a sale price that's lower than the allowed minimum"
      ) !== -1

    if (isSalePriceTooLowError) {
      throw new MetaTransactionError(
        error.message,
        ErrorCode.SALE_PRICE_TOO_LOW
      )
    }

    // Other errors
    const isKnown = error instanceof MetaTransactionError
    if (!isKnown) {
      console.warn(
        'An error occurred trying to send the meta transaction. Error:',
        error.message
      )
      throw new MetaTransactionError(error.message, ErrorCode.UNKNOWN)
    } else {
      throw error
    }
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
