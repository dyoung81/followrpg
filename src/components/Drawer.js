import React, { useState } from "react";
import { Drawer, IconButton } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
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
        <Link href="/" onClick={closeDrawer}>
          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </Link>
        <Link href="/search" onClick={closeDrawer}>
          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
          </List>
        </Link>
        <Link href="/gamedetails" onClick={closeDrawer}>
          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Game Details" />
            </ListItem>
          </List>
        </Link>
      </Drawer>
    </div>
  );
}
