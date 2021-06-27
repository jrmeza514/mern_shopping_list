import { useState } from 'react';
import Logout from './auth/Logout';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Menu as MenuIcon, Mail as MailIcon} from '@material-ui/icons';
import { IAppNavbar, IAuthReduxProps } from '../types/interfaces';

import { List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer,
        AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


const AppNavBar = ({auth}: IAppNavbar) => {

    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();
    const toggle = () => setIsOpen(!isOpen);
    const anchor = "left";
    
    
    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Shopping List
                    </Typography>
                    { auth?.isAuthenticated ? <Logout/> : null }

                </Toolbar>
            </AppBar>
            <SwipeableDrawer 
                anchor={anchor} 
                open={isOpen}
                onClose={toggle}
                onOpen={toggle}>
                <List>
                    <ListItem button>
                        <ListItemIcon><MailIcon/></ListItemIcon>
                        <ListItemText primary={"text"} />
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </div>
    ) 
}

const mapStateToProps = ( state: IAuthReduxProps ) => ({
    auth: state.auth
});

export default connect(mapStateToProps,null)(AppNavBar);