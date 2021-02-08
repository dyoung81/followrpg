import React from "react";
import Navbar from "./components/Navbar";
import AppBody from "./components/AppBody";
import { useStyles } from "./CustomHooks";

function App() {
  const classes = useStyles();
  const darkClasses = `${classes.dark} ${classes.root}`;
  return (
    <div className={darkClasses}>
      <Navbar />
      <AppBody />
    </div>
  );
}

export default App;
