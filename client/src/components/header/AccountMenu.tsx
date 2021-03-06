import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { AccountCircle as AvatarIcon } from '@material-ui/icons';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';
import { IAuthReduxProps, IUserState } from '../../types/interfaces';
import { Link } from 'react-router-dom';
import { light, dark } from '../../theme/main';

interface AccountMenuProps {
  logout(): void;
  auth: {
    user: IUserState
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
  const theme = auth.user.userPrefs.theme === "THEME_DARK" ? dark : light;

  return (
    <>
      <Box>
        <IconButton onClick={handleClick} size="small" style={{ backgroundColor: theme.palette.secondary.main }}>
          <Avatar style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}>
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
              <AvatarIcon fontSize="small" color="secondary" />
            </ListItemIcon>
            My account
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="secondary" />
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