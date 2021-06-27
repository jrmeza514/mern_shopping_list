import { connect } from 'react-redux';
import { IAppNavbar, IAuthReduxProps } from '../types/interfaces';
import ShoppingList from './ShoppingList';
import AuthFormTabs from './auth/AuthFormTabs';

const AppNavBar = ({ auth }: IAppNavbar) => {


    return (
        <div className="container">
            {auth?.isAuthenticated ? <ShoppingList /> : <AuthFormTabs />}
        </div>
    )
}

const mapStateToProps = (state: IAuthReduxProps) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavBar);