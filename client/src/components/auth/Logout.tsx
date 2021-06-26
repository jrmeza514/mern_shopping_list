import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { ILogoutProps } from '../../types/interfaces';
import { Button } from '@material-ui/core';

export const Logout = ({ logout }: ILogoutProps) => {

  return (
    <Button color="inherit" onClick={logout}> Logout </Button>
  );
};

export default connect(null, { logout })(Logout);