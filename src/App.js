import React from 'react'
import  Logo from './media/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/Navbar'
import AppBody from './components/AppBody'
import Button from '@material-ui/core/Button'



const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    color: 'primary'
  },
  dark: {
    backgroundColor: '#102A43',
    color: '#F0F4F8'
  },
});

const MyLogo = () => <img src={Logo} height='40' alt="" />
function App() {
  const classes = useStyles();
  const darkClasses = `${classes.dark} ${classes.root}`
  return (
    <div className={darkClasses}>
      <Navbar/>
      <AppBody />
    </div>
  );
}

export default App;
