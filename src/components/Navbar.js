
import Logo from '../media/logo.png'
import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TemporaryDrawer from './Drawer';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
const TheLogo = () => <img src={Logo} height='45' alt="" />
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <BrowserRouter>
            <TemporaryDrawer/>
        </BrowserRouter>
            <TheLogo className={classes.title}/>
        </Toolbar>

        
      </AppBar>
      
    </div>
  );
}