<img src="https://ui.decentraland.org/decentraland_256x256.png" height="128" width="128" />

# Decentraland Transactions

Send meta transactions

### API

```ts
const methodData = { functionSignature: '', contractData: getManaContract() }
const signer = myProvider.currentAccount // => '0x1dfabec'

const ethers = new MetaTx.clients.Ethers(signer)
const txHash = await ethers.sendMetaTransaction(
  methodData,
  (dataToSign: DataToSign) => myProvider.sign(signer, dataToSign)
  /*, getConfiguration() */
)

console.log(txHash)
```
