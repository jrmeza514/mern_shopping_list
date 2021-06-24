import { useCallback, useEffect, useState } from 'react';
import { register, logout } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { connect } from 'react-redux';

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
import { E_Error, IAuthReduxProps, IRegisterModal, ITarget } from '../../types/interfaces';


const RegisterModal = ({isAuthenticated, error, register, clearErrors}: IRegisterModal) => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);

    const toggle = useCallback(() => {
        clearErrors();
        setModal(!modal);
    }, [modal, setModal, clearErrors]);

    const handleOnNameChange = (e: ITarget) => setName(e.target.value);
    const handleOnEmailChange = (e: ITarget) => setEmail(e.target.value);
    const handleOnPasswordChange = (e: ITarget) => setPassword(e.target.value);

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        const newUser = { name, email, password };
        register(newUser);
    }

    useEffect(() => {
        if (error.id === E_Error.REGISTER_FAIL) setMsg(error.msg.msg);
        else setMsg(null);

        if(modal && isAuthenticated) toggle();
    }, [error, setMsg, modal, isAuthenticated, toggle]);
    
    return (
        <div>
            <NavLink onClick={toggle} href="#"> Register </NavLink>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Register </ModalHeader>
                <ModalBody>
                    {msg ? <Alert color="danger">{msg}</Alert> : null}
                    <Form onSubmit={(e) => handleOnSubmit(e)}>
                        <FormGroup>
                            <Label for="name"> Name </Label>
                            <Input type="text" name="name" id="name" placeholder="Name" onChange={handleOnNameChange} className="mb-3"></Input>

                            <Label for="email"> Email </Label>
                            <Input type="email" name="email" id="email" placeholder="Email" onChange={handleOnEmailChange} className="mb-3"></Input>

                            <Label for="password"> Password </Label>
                            <Input type="password" name="password" id="password" placeholder="Password" onChange={handleOnPasswordChange} className="mb-3" autocomplete='new-password'></Input>

                            <Button color="dark" style={{ marginTop: '1rem' }} type="submit" block>  Register </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
    
}
const mapStateToProps = (state : IAuthReduxProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    register,
    clearErrors
})

export default connect(mapStateToProps, { register, clearErrors, logout })(RegisterModal);