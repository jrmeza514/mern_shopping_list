import { useEffect, useState } from 'react';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { connect } from 'react-redux';
import { E_Error, IAuthReduxProps, IRegisterModal, ITarget } from '../../types/interfaces';
import { TextField, Button } from '@material-ui/core';


const RegisterForm = ({ isAuthenticated, error, register, clearErrors }: IRegisterModal) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState<string | null>(null);

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


    }, [error, setMsg, isAuthenticated]);

    return (
        <>
            {msg ? <h4> {msg} </h4> : null}
            <form onSubmit={handleOnSubmit}>
                <TextField type="text" name="name" id="name" label="Name" onChange={handleOnNameChange} />
                <TextField type="email" name="email" id="email" label="Email" onChange={handleOnEmailChange} />
                <TextField type="password" name="password" id="password" label="Password" onChange={handleOnPasswordChange} autoComplete='new-password' />
                <br />
                <Button type="submit" variant="contained" color="secondary"> Register </Button>
            </form>
        </>
    )

}
const mapStateToProps = (state: IAuthReduxProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    register,
    clearErrors
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterForm);