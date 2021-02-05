import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.palette.text.main,
  },
}));


export default function AppBody(props) {
    const classes = useStyles();

    return (
      <div> 
          <h1 className={classes.text}>Body Boyyyyyyys</h1>
      </div>
    )
  }
