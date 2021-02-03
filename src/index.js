import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {orange , green} from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'


const theme = createMuiTheme({
  palette:{
    primary: {
      main: green[400],
    },
    secondary: {
      main: orange[400],
    }
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
      <App />
  </ThemeProvider>,
  document.getElementById('root')
);


