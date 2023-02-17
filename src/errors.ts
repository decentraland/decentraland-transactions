export enum ErrorCode {
  UNKNOWN = 'unknown',
  DAPP_LIMIT_REACHED = 'dapp_limit_reached',
  USER_LIMIT_REACHED = 'user_limit_reached',
  API_LIMIT_REACHED = 'api_limit_reached',
  GAS_LIMIT_REACHED = 'gas_limit_reached',
  EXPECTATION_FAILED = 'expectation_failed',
  INVALID_TRANSACTION = 'invalid_transaction',
  INVALID_SCHEMA = 'invalid_schema',
  INVALID_CONTRACT_ADDRESS = 'invalid_contract_address',
  INVALID_ADDRESS = 'invalid_address',
  SALE_PRICE_TOO_LOW = 'sale_price_too_low',
  QUOTA_REACHED = 'quota_reached',
  CONTRACT_ACCOUNT = 'contract_account',
  HIGH_CONGESTION = 'high_congestion',
  USER_DENIED = 'user_denied'
}

export class MetaTransactionError extends Error {
  constructor(message: string, public code: ErrorCode) {
    super(message)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, MetaTransactionError.prototype)
  }
}
