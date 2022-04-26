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
  
  window.near = await nearApi.connect(config);
  window.walletConnection =  new nearApi.WalletConnection(near)

  window.accountId = window.walletConnection.getAccountId()
  
  window.contract = await new nearApi.Contract(window.walletConnection.account(), config.contractName, {
    viewMethods: ['getGreeting', 'getBlockIndex'],
    changeMethods: ['setGreeting'],
  })

  window.highScore = await window.contract.getGreeting({ accountId: window.accountId });

  // window.walletConnection.signOut();
})(window);

export function loginNearWallet() {
  window.walletConnection.requestSignIn();
}

export function isLoginNearWallet() {
  return window.walletConnection.isSignedIn();
}

export function getHighScore() {
  return window.highScore || 0;
}