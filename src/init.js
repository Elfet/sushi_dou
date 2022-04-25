import * as nearApi from 'near-api-js';
import { getConfig } from './config'
import * as buffer from 'buffer';

window.Buffer = buffer.Buffer;

(async function () {
  const config =  {
    ...getConfig('development'),
    deps: {
      keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
    }, 
  };
  console.log(config);
  
  window.near = await nearApi.connect(config);
  window.walletConnection =  new nearApi.WalletConnection(near)

  if (!window.walletConnection.isSignedIn()) {
    window.walletConnection.requestSignIn();
  }

  window.accountId = window.walletConnection.getAccountId()
  
  window.contract = await new nearApi.Contract(window.walletConnection.account(), config.contractName, {
    viewMethods: ['getGreeting', 'getBlockIndex'],
    changeMethods: ['setGreeting'],
  })
  console.log(window.contract)

  // wallet.signOut();
})(window);


document.querySelector('#sign-in-button').onclick = async (event) => {
  await window.contract.setGreeting({
    message: '1'
  });
}

document.querySelector('#get-contract').onclick = async (event) => {
  const score = await window.contract.getGreeting({ accountId: window.accountId })
  const blockIndex = await window.contract.getBlockIndex()
  console.log(score);
  console.log(blockIndex)
}