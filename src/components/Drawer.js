import React, { useState } from "react";
import { Drawer, IconButton } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { useStyles } from "../CustomHooks";

export default function TemporaryDrawer(props) {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const toggleDrawerStatus = () => {
    setIsDrawerOpened(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpened(false);
  };

  const classes = useStyles();
  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        onClick={toggleDrawerStatus}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        open={isDrawerOpened}
        onClose={closeDrawer}
        transitionDuration={100}
      >
        <Link component={RouterLink} to="/">
          <ListItem button onClick={closeDrawer}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link component={RouterLink} to="/addgame">
          <ListItem button onClick={closeDrawer}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Add Game" />
          </ListItem>
        </Link>
        <Link component={RouterLink} to="/search">
          <ListItem button onClick={closeDrawer}>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
        </Link>
        <Link component={RouterLink} to="/gamedetails">
          <ListItem button onClick={closeDrawer}>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Game Details" />
          </ListItem>
        </Link>
      </Drawer>
    </div>
  );
}
