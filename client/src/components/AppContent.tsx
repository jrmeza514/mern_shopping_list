import { connect } from 'react-redux';
import { IAuthReduxProps } from '../types/interfaces';
import ShoppingList from './shopping/ShoppingList';
import AuthFormTabs from './auth/AuthFormTabs';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

interface AppContentProps {
    auth?: {
        isAuthenticated: boolean;
        isLoading: boolean
    };
}

const AppContent = ({ auth }: AppContentProps) => {

    return (
        <div className="app-content-container">
            {
                (() => {
                    if (auth) {
                        if (auth.isAuthenticated && !auth.isLoading) {
                            return (
                                <Router>
                                    <Switch>
                                        <Route path="/settings">
                                            Settings
                                        </Route>
                                        <Route path="/">
                                            <ShoppingList />
                                        </Route>
                                    </Switch>
                                </Router>
                            )
                        } else if (!auth.isLoading && !auth.isAuthenticated) {
                            return <AuthFormTabs />
                        }
                    }
                })()
            }
        </div>
    )
}

const mapStateToProps = (state: IAuthReduxProps) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppContent);