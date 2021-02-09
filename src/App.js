import React from "react";
import Navbar from "./components/Navbar";
import AppBody from "./components/AppBody";
import { useStyles } from "./CustomHooks";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const classes = useStyles();
  const darkClasses = `${classes.dark} ${classes.root}`;
  return (
    <Router>
      <div className={darkClasses}>
        <Navbar />
        <AppBody />
      </div>
    </Router>
  );
}

export default App;
