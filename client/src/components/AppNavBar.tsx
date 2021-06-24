import { useState } from 'react';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { connect } from 'react-redux';

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
import { IAppNavbar, IAuthReduxProps } from '../types/interfaces';

const AppNavBar = ({auth}: IAppNavbar) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    
    return (
        <>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Shopping List</NavbarBrand>
                    <NavbarToggler onClick={toggle}></NavbarToggler>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        {   
                            //If Logged In
                            ( auth && auth.isAuthenticated) ? 
                                <>
                                <NavItem>
                                    <NavLink> {`Welcome, ${auth.user.name}`} </NavLink>
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

const mapStateToProps = ( state: IAuthReduxProps ) => ({
    auth: state.auth
});

export default connect(mapStateToProps,null)(AppNavBar);