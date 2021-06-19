import React, { Component, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { E_Error, IAuthReduxProps, ILoginModal, ITarget } from "../../types/interfaces";

const LoginModal = ({isAuthenticated, error, login}: ILoginModal) => {

    const [modal, setModal] = useState(false);
    const [msg, setMsg] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggle = () => setModal(!modal);

    const handleOnEmailChange = (e: ITarget) => setEmail(e.target.value);
    const handleOnPasswordChange = (e: ITarget) => setPassword(e.target.value);

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        login({email, password});
    }

    useEffect(() => {
        if(error.id === E_Error.LOGING_FAIL) setMsg(error.msg.msg);
        else setMsg(null);

        if(modal && isAuthenticated) toggle();
    }, [login]);

    return (
        <div>
            <NavLink onClick={toggle} href="#"> Login </NavLink>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Login </ModalHeader>
                <ModalBody>
                    {msg ? <Alert color="danger">{msg}</Alert> : null}
                    <Form onSubmit={(e) => handleOnSubmit(e)}>
                        <FormGroup>

                            <Label for="email"> Email </Label>
                            <Input type="email" name="email" id="email" placeholder="Email" onChange={handleOnEmailChange} className="mb-3"></Input>

                            <Label for="password"> Password </Label>
                            <Input type="password" name="password" id="password" placeholder="Password" onChange={handleOnPasswordChange} className="mb-3"></Input>

                            <Button color="dark" style={{ marginTop: '1rem' }} type="submit" block>  Login </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state: IAuthReduxProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    login,
    clearErrors
});
export default connect(mapStateToProps, { login, clearErrors })(LoginModal);