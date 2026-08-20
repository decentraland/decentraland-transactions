import {
  getAccount,
  getNonce,
  getSignature,
  getExecuteMetaTransactionData,
  getSalt,
  isContract,
  getOffchainExecuteMetaTransactionData
} from './utils'
import { getConfiguration } from './configuration'
import {
  Provider,
  Configuration,
  DataToSign,
  ContractData,
  DomainData,
  DOMAIN_TYPE,
  META_TRANSACTION_TYPE,
  OFFCHAIN_META_TRANSACTION_TYPE
} from './types'
import { ErrorCode, MetaTransactionError } from './errors'

type RelayResponseBody =
  | {
      ok: false
      message: string
      code: ErrorCode
      /**
       * Set by the relay server when the signature was the right account's but over a nonce the target has
       * moved past. Optional: older servers do not send it, and then nothing is retried.
       */
      reason?: 'stale_meta_transaction_nonce'
    }
  | { ok: true; txHash: string }

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

    const hasFunctionDataInput = contractData.abi.some(
      (el: {
        name?: string
        inputs?: { name?: string; type: string; indexed?: boolean }[]
      }) =>
        el.name === 'executeMetaTransaction' &&
        el.inputs?.some(input => input.name === '_functionData')
    )

    const salt = getSalt(contractData.chainId)
    const domainData = getDomainData(salt, contractData)

    const getMetaTransactionData = hasFunctionDataInput
      ? getOffchainExecuteMetaTransactionData
      : getExecuteMetaTransactionData

    /**
     * Read the nonce, sign, relay. One whole attempt, because the nonce is what makes it repeatable.
     */
    const attempt = async (): Promise<{
      body: RelayResponseBody
      status: number
    }> => {
      const nonce = await getNonce(
        metaTransactionProvider,
        account,
        contractData.address
      )
      const dataToSign = getDataToSign(
        account,
        nonce,
        functionSignature,
        domainData,
        hasFunctionDataInput
      )
      const signature = await getSignature(
        provider,
        account,
        JSON.stringify(dataToSign)
      )
      const txData = getMetaTransactionData(
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

      return { body: await response.json(), status: response.status }
    }

    let { body, status } = await attempt()

    /**
     * Sign again, once, when the relay server says the nonce moved under us.
     *
     * The nonce is not part of the payload: this reads it from the target to build the signature, and the
     * relay server reads it AGAIN to rebuild the digest and recover the signer. Those two reads race
     * whenever the same account already has a meta-transaction in flight — send two in a row and the second
     * is built over a nonce the chain has moved past by the time it is checked, so recovery returns an
     * unrelated address and the request is refused. Measured in production: two occurrences in eight days,
     * one of them costing a buyer half their basket.
     *
     * Retrying is safe with money BECAUSE the server answered. A parsed rejection means the transaction was
     * provably not relayed, so nothing has been submitted and re-signing cannot double-spend. That is the
     * whole reason this is keyed on `reason` rather than on any failure: an unreachable server may well have
     * submitted before the connection died, and retrying THAT would be a second transaction.
     *
     * Once, not in a loop — a nonce that keeps moving means something else is submitting for this account,
     * and racing it is not this function's business. Note this costs a second signature, which on a wallet
     * that prompts means a second prompt; it happens only on a rejection that would otherwise have failed
     * outright.
     */
    if (body.ok === false && body.reason === 'stale_meta_transaction_nonce') {
      const retried = await attempt()
      body = retried.body
      status = retried.status
    }

    if (body.ok === false) {
      if (body.message && body.code) {
        throw new MetaTransactionError(body.message, body.code)
      }

      throw new Error(`HTTP Error. Status: ${status}.`)
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
  domainData: DomainData,
  hasFunctionDataInput = false
): DataToSign {
  return {
    types: {
      EIP712Domain: DOMAIN_TYPE,
      MetaTransaction: hasFunctionDataInput
        ? OFFCHAIN_META_TRANSACTION_TYPE
        : META_TRANSACTION_TYPE
    },
    domain: domainData,
    primaryType: 'MetaTransaction',
    message: {
      nonce: parseInt(nonce, 16),
      from: account,
      ...(hasFunctionDataInput
        ? { functionData: functionSignature }
        : { functionSignature })
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
