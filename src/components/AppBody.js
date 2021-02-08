import React from "react";
import { useStyles } from "../CustomHooks";

export default function AppBody(props) {
  const classes = useStyles();

  return (
    <div>
      <h1 className={classes.text}>Body Boyyyyyyys</h1>
    </div>
  );
}
