import React, { Component } from 'react';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import  {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class AppNavBar extends Component {
    state = {
        isOpen: false
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render(){
        return (
            <>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Shopping List</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                            {   
                                //If Logged In
                                (this.props.auth.isAuthenticated) ? 
                                    <>
                                    <NavItem>
                                        <NavLink> {`Welcome, ${this.props.auth.user.name}`} </NavLink>
                                    </NavItem>
                                    <NavItem> 
                                        <Logout/> 
                                    </NavItem>
                                    </>
                                : // If Not Logged In
                                    <>
                                    <NavItem>
                                        <LoginModal/>
                                    </NavItem>
                                    <NavItem>
                                        <RegisterModal/>
                                    </NavItem>
                                    </> 
                            }   
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(AppNavBar);