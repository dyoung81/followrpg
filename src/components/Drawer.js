import React, {useState} from 'react'; 
import { Drawer, IconButton } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'; 
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar'; 
import MenuIcon from '@material-ui/icons/Menu'; 
import AccountCircleIcon from '@material-ui/icons/AccountCircle'; 
import { Link } from 'react-router-dom'; 


const useStyles = makeStyles((theme) => ({
    link: {
        color: 'black',
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    drawer: {
        background: theme.palette.primary.main,
    },
})); 
  
export default function TemporaryDrawer(props) {

    
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const toggleDrawerStatus = () => {
        setIsDrawerOpened(true)
    } 
    const closeDrawer = () => { 
        setIsDrawerOpened(false)
    } 

    
    const classes = useStyles(); 
    return ( 
      <div> 
            <IconButton edge='start' className={classes.menuButton} color='inherit' onClick={toggleDrawerStatus}> 
              <MenuIcon />
            </IconButton> 

        <Drawer
            classes={{paper: classes.drawer}}
            variant="temporary"
            open={isDrawerOpened} 
            onClose={closeDrawer}    
        > 
          <Link to='/about'> 
            <List> 
              <ListItem button key='About Us'> 
                <ListItemIcon><AccountCircleIcon/> 
                </ListItemIcon> 
                <ListItemText primary='About Us' /> 
              </ListItem> 
            </List> 
          </Link> 
          <Link to='/contact'> 
          <List> 
            <ListItem button key='Contact Us'> 
              <ListItemIcon><PermContactCalendarIcon/> 
              </ListItemIcon> 
              <ListItemText primary='Contact Us' /> 
            </ListItem> 
            </List> 
          </Link> 
        </Drawer> 
      </div> 
    ); 
  } 