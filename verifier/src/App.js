import logo from './logo.svg';
import './App.css';
var web3 = require("web3")


var Web3 = require("web3")
var $ = require("jquery")
console.log("Logs working")
var contract = require("@truffle/contract");
var mnemonic = "hover danger amused inject work crystal impose narrow lock twelve close section"
async () => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        // From now on, this should always be true:
        // provider === window.ethereum
        startApp(provider); // initialize your app
      } else {
        console.log('Please install MetaMask!');
      }
    } catch (error) {
      
    }

}
function startApp(provider) {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }
  // Access the decentralized web!
}
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }

function getAccounts(callback) {
  web3.eth.getAccounts((error,result) => {
      if (error) {
          console.log(error);
      } else {
          callback(result);
      }
  });
}
window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            ethereum.request({ method: 'eth_requestAccounts' });
            // Request account access if needed
            await ethereum.request({ method: 'eth_requestAccounts' });
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }

    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}); 

function App (){
  <div>

  </div>
// If the provider returned by detectEthereumProvider is not the same as
// window.ethereum, something is overwriting it, perhaps another wallet
}
export default App;
