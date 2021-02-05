import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'



const theme = createMuiTheme({
  palette:{
    primary: {
      main: '#243B53',
    },
    secondary: {
      main: '#486581',
    },
    text: {
      main: '#9FB3C8',
    },
  },
  typography: {
    primary: {
      
    }
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
      <App />
  </ThemeProvider>,
  document.getElementById('root')
);


