import React from 'react'
import  Logo from './g1422.png';
import './App.css';
import SvgIcon from '@material-ui/core/SvgIcon'

const MyLogo = () => <img src={Logo} alt="" />

function App() {
  return (
    <div>
      <header className="App-header">
         <MyLogo />       
      </header>
    </div>
  );
}

export default App;
