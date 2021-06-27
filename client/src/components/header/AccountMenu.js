import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';
import theme from '../../theme/main';

const AccountMenu = ({ logout, auth }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [accoutnMenuOpen, setAccountMenuOpen] = useState(false);
  const handleClose = () => setAccountMenuOpen(false);

  const handleClick = (event) => {
    setAnchorEl(event.target);
    setAccountMenuOpen(!accoutnMenuOpen);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} >
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar sx={{ width: 32, height: 32 }}
            style={{ backgroundColor: theme.palette.secondary.main }}>
            {auth.user.name[0]}
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={accoutnMenuOpen}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem disabled>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem disabled>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(AccountMenu);