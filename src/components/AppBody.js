import React from "react";
import { useStyles } from "../CustomHooks";
import Home from "../pages/Home";
import Search from "../pages/Search";
import GameDetails from "../pages/GameDetails";
import { Route, Switch } from "react-router-dom";
import AddGame from "../pages/AddGame";

export default function AppBody(props) {
  const classes = useStyles();

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/addgame">
          <AddGame />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/gamedetails">
          <GameDetails />
        </Route>
      </Switch>
    </div>
  );
}
