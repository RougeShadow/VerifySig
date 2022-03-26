
import { createTheme , ThemeProvider , makeStyles} from '@material-ui/core/styles';
import './App.css';
import {useState} from 'react';
import { Box, TextField, typography } from '@material-ui/core';
import CustomBtn from './components/CustomBtn';
import { CssBaseline } from '@material-ui/core';

var message = ""
const theme = createTheme({
  palette: {
    type:'dark',
  },
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
);
const styles = makeStyles({

  input: {
    color:"white"
  },
});
function App(props) {
  const classes = styles();
  
  const [textInput, setTextInput] = useState('');
  const [buttonPress, submit] = useState('');
  const handleButtonPress = e => {
    
  }
  const handleTextInputChange = event => {
    console.log(event.target.value);
    assestTagQuery = event.target.value
    setTextInput(event.target.value);
    };


  return (

    <div className="App">
      <TextField value= {textInput} onChange= {handleTextInputChange} InputProps={{className: classes.input}} label="Message"/>
      
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box textAlign='center'>
      <CustomBtn onclick=""  sx = {{}} variaint = 'contained' txt="submit">
      </CustomBtn>
      </Box>
      </ThemeProvider>
    </div>


  );
}



export default App;
