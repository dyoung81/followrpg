import Logo from "../media/logo.png";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TemporaryDrawer from "./Drawer";
import { BrowserRouter } from "react-router-dom";
import { useStyles } from "../CustomHooks";
const TheLogo = () => <img src={Logo} height="45" alt="" />;

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <BrowserRouter>
            <TemporaryDrawer />
          </BrowserRouter>
          <TheLogo />
        </Toolbar>
      </AppBar>
    </div>
  );
}
