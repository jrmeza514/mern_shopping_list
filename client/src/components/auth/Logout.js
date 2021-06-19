import { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { Fragment } from "react";
import PropTypes from 'prop-types';

import { logout } from "../../actions/authActions";

class Logout extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired
    }

    render() {
        return (
            <Fragment>
                <NavLink onClick={this.props.logout} href="#">
                    Logout
                </NavLink>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    logout
})

export default connect(mapStateToProps, { logout })(Logout);