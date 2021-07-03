import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { Settings, AccountCircle as AvatarIcon } from '@material-ui/icons';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';
import { IAuthReduxProps } from '../../types/interfaces';
import { Link } from 'react-router-dom';

interface AccountMenuProps {
  logout(): void;
  auth: {
    user: {
      name: string
    }
  }
}

const AccountMenu = ({ auth, logout }: AccountMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [accoutnMenuOpen, setAccountMenuOpen] = useState(false);
  const handleClose = () => setAccountMenuOpen(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setAccountMenuOpen(!accoutnMenuOpen);
  };

  return (
    <>
      <Box>
        <IconButton onClick={handleClick} size="small">
          <Avatar>
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
        <Link to="/account">
          <MenuItem>
            <ListItemIcon>
              <AvatarIcon fontSize="small" />
            </ListItemIcon>
            My account
          </MenuItem>
        </Link>
        <Divider />
        <Link to="/settings">
          <MenuItem >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Link>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
const mapStateToProps = (state: IAuthReduxProps) => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(AccountMenu);