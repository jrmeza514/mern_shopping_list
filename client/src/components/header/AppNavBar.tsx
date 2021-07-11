import { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon, ExitToApp as LogoutIcon, AccountCircle as AvatarIcon } from '@material-ui/icons';
import { IAppNavbar, IAuthReduxProps } from '../../types/interfaces';
import AccountMenu from './AccountMenu';
import { logout } from '../../actions/authActions';
import {
    List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer,
    AppBar, Toolbar, Typography, IconButton
} from '@material-ui/core';
import { Link } from 'react-router-dom';

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


const AppNavBar = ({ auth, logout }: IAppNavbar) => {

    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();
    const toggle = () => setIsOpen(!isOpen);
    const anchor = "left";


    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    {auth?.isAuthenticated ? (
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggle}>
                            <MenuIcon />
                        </IconButton>
                    ) : null}
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/">Shopping List</Link>
                    </Typography>
                    {auth?.isAuthenticated ? <AccountMenu /> : null}

                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor={anchor}
                open={isOpen}
                onClose={toggle}
                onOpen={toggle}
                onClick={toggle}>
                <List>
                    <Link to="/account">
                        <ListItem button>
                            <ListItemIcon><AvatarIcon>J</AvatarIcon></ListItemIcon>
                            <ListItemText primary={"Account"} />
                        </ListItem>
                    </Link>
                    <ListItem button onClick={logout}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary={"Logout"} />
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </div>
    )
}

const mapStateToProps = (state: IAuthReduxProps) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(AppNavBar);