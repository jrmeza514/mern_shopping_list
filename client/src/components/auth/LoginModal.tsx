import { useCallback, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { E_Error, IAuthReduxProps, ILoginModal, ITarget } from "../../types/interfaces";
import AppModal from "../util/AppModal";
import {Button, TextField} from '@material-ui/core';

const LoginModal = ({isAuthenticated, error, login, clearErrors}: ILoginModal) => {
    
    const [modal, setModal] = useState(false);
    const [msg, setMsg] = useState<String | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggle = useCallback(() => {
        setModal(!modal);
        clearErrors();
    }, [setModal,modal, clearErrors]);

    const handleOnEmailChange = (e: ITarget) => setEmail(e.target.value);
    const handleOnPasswordChange = (e: ITarget) => setPassword(e.target.value);
    
    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        login({email, password});
    }

    useEffect(() => {
        const errorMatch = error.id === E_Error.LOGING_FAILED;
        if(errorMatch) setMsg(error.msg);
        else setMsg(null);
        if(modal && isAuthenticated) toggle();
    }, [login, setMsg, error, isAuthenticated, modal, toggle, msg]);

    return (
        <>
            <Button color="inherit" onClick={toggle}> Login </Button>
            <AppModal open={modal} toggle={toggle.bind(this)}>
                { msg ? <h4> {msg} </h4> : null }
                <form noValidate autoComplete="on" onSubmit={handleOnSubmit}>
                    <TextField id="email" name="email" type="email" label="Email" onChange={handleOnEmailChange}/>
                    <TextField id="password" label="Password" type="password" onChange={handleOnPasswordChange}/>
                    <Button type="submit">Submit</Button>
                </form>
            </AppModal>
        </>
    )
}

const mapStateToProps = (state: IAuthReduxProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    login,
    clearErrors
});
export default connect(mapStateToProps, { login, clearErrors })(LoginModal);