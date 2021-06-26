import { useCallback, useEffect, useState } from 'react';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { connect } from 'react-redux';
import { E_Error, IAuthReduxProps, IRegisterModal, ITarget } from '../../types/interfaces';
import AppModal from '../util/AppModal';
import { TextField, Button } from '@material-ui/core';


const RegisterModal = ({isAuthenticated, error, register, clearErrors}: IRegisterModal) => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState<string | null>(null);

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
        if (error.id === E_Error.REGISTER_FAILED) setMsg(error.msg);
        else setMsg(null);

        if(modal && isAuthenticated) toggle();
    }, [error, setMsg, modal, isAuthenticated, toggle]);
    
    return (
        <>
            <Button color="inherit" onClick={toggle}> Register </Button>
            <AppModal open={modal} toggle={toggle}>
                { msg ? <h4> {msg} </h4> : null }
                <form onSubmit={handleOnSubmit}>
                    <TextField type="text" name="name" id="name" placeholder="Name" onChange={handleOnNameChange}/>
                    <TextField type="email" name="email" id="email" placeholder="Email" onChange={handleOnEmailChange}/>
                    <TextField type="password" name="password" id="password" placeholder="Password" onChange={handleOnPasswordChange} autoComplete='new-password'/>
                    <Button type="submit" variant="contained" color="secondary"> Register </Button>
                </form>
                
            </AppModal>
        </>
    )
    
}
const mapStateToProps = (state : IAuthReduxProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    register,
    clearErrors
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);