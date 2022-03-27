import { createTheme , ThemeProvider , makeStyles} from '@material-ui/core/styles';
import './App.css';
import React from 'react';
import {useState} from 'react';
import { Box, TextField, typography } from '@material-ui/core';
import CustomBtn from './components/CustomBtn';
import { CssBaseline } from '@material-ui/core';
import contractJson from './abis/VerifySignature.json'
import './App.css';
import Web3 from "web3"
import detectEthereumProvider from '@metamask/detect-provider'
import { verify } from 'crypto';
var Accounts = require('web3-eth-accounts');
console.log("Logs working")
var contract = require("@truffle/contract");
var $ = require("jquery")
var fs = require("fs")
var web3
const { abi } = require('./abis/VerifySignature.json');
var Contract = require('web3-eth-contract');





function  startApp(provider) {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }

 
  
}
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }

function getAccounts(callback) {
  Web3.eth.getAccounts((error,result) => {
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
        window.web3 = new Web3(window.ethereum);
        try {
            window.ethereum.request({ method: 'eth_requestAccounts' });
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
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
        Web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}); 


web3 = new Web3(window.ethereum)
const theme = createTheme({
  palette: {
    type:'dark',
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
});
const styles = makeStyles({

  input: {
    color:"white"
  },
});
var message = ""
var _hashMessage = ""
function _text(props) {
  return(<p variant='contained'>{props.txt}</p>)

}

var VerifyInterface = new Contract(abi,"0xFc5bC50cdc020760eC4527456F4dA89620a30212")
VerifyInterface.setProvider(window.ethereum)
console.log(VerifyInterface)
var account
account = web3.eth.getAccounts().then(
  f =>{
  account = f
  console.log(account)
})  

function App() {
  const classes = styles();
  const [textInput, setTextInput] = useState('');
  const [signature, setSignature] = useState('')
  const [buttonPress, submit] = useState('');
  const [hashText, setHashText]= useState('')
  const [signedHashText, setSignedHashText]= useState('')

  const [verifyText,setVerifyText] = useState('')
  var _hashText
  var isAuth
  var hash
  async function recieveHash(text){
    hash = await VerifyInterface.methods.getMessageHash(text).call()
    var getEthSignedMessageHash
    getEthSignedMessageHash = await VerifyInterface.methods.getEthSignedMessageHash(hash).call()
    console.log(hash)
    console.log(typeof hash)
    await web3.eth.sign(getEthSignedMessageHash,account[0], function(err, _signature) {
      console.log(account[0])
      console.log('signature: ' + _signature);
      setSignature(_signature)
      _hashText = _signature
      console.log(_hashText)
    })}
    async function verification(){
      //console.log((_hashText))
      //console.log(hashText)
      console.log(signedHashText)
      var accountRecover
      var getEthSignedMessageHash
      getEthSignedMessageHash = await VerifyInterface.methods.getEthSignedMessageHash(signedHashText).call()
      accountRecover = await VerifyInterface.methods.recoverSigner(getEthSignedMessageHash,hashText).call()
      console.log("account:"+accountRecover)
      isAuth = await VerifyInterface.methods.verify(account[0],textInput,hashText).call()
      console.log(isAuth)
      console.log(typeof isAuth)
      
    }
    
    async function handleButtonPress(){
      console.log(account[0])
      await recieveHash(textInput)
      //window.ethereum.request({ method: "personal_sign", params: [account[0],textInput]})
      console.log("ureek",_hashText)
      var signatureString = _hashText
      setHashText(signatureString)
      setSignedHashText(hash)
    
  }
  async function handleVerifyPress(){
    await verification()
    //window.ethereum.request({ method: "personal_sign", params: [account[0],textInput]})
    if (isAuth == true){
      isAuth = "True"
      setVerifyText(isAuth)
    }
    if (isAuth === false){
      isAuth = "False"
      setVerifyText(isAuth)
    }
    
  
}
  const handleTextInputChange = event => {
    setTextInput(event.target.value);
    
    };


  return (

    <div className="App">
      <TextField value= {textInput} onChange= {handleTextInputChange} InputProps={{className: classes.input}} label="Message"/>
      
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box textAlign='center'>
      <button onClick={handleButtonPress}  sx = {{}} variaint = 'contained' txt="submit">
        sendMessage
      </button>
      <_text txt={"signature:"+hashText}></_text>
      </Box>
      <button onClick={handleVerifyPress}>Verify</button>
      <_text txt={verifyText}></_text>
      </ThemeProvider>
    </div>


  );
}


export default App;
