import React from "react";
import { useStyles } from "../CustomHooks";
import Home from "../pages/Home";
import Search from "../pages/Search";
import GameDetails from "../pages/GameDetails";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function AppBody(props) {
  const classes = useStyles();

  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={Search} />
        <Route path="/gamedetails" exact component={GameDetails} />
      </div>
    </Router>
  );
}
