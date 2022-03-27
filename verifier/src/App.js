import { createTheme , ThemeProvider , makeStyles} from '@material-ui/core/styles';
import './App.css';
import React from 'react';
import {useState} from 'react';
import { Box, TextField} from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import Web3 from "web3"
console.log("Logs working")

var web3
const { abi } = require('./abis/VerifySignature.json');
var Contract = require('web3-eth-contract');


if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
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
  }
});
const styles = makeStyles({

  input: {
    color:"white"
  },
});

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
