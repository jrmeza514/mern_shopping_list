import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { E_Error, IAuthReduxProps, ILoginModal, ITarget } from "../../types/interfaces";
import { Button, TextField } from '@material-ui/core';

const LoginForm = ({ isAuthenticated, error, login, clearErrors }: ILoginModal) => {
    const [msg, setMsg] = useState<String | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleOnEmailChange = (e: ITarget) => setEmail(e.target.value);
    const handleOnPasswordChange = (e: ITarget) => setPassword(e.target.value);

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        login({ email, password });
    }

    useEffect(() => {
        const errorMatch = error.id === E_Error.LOGING_FAILED;
        if (errorMatch) setMsg(error.msg);
        else setMsg(null);
    }, [login, setMsg, error, isAuthenticated, msg]);

    return (
        <>
            {msg ? <h4> {msg} </h4> : null}
            <form noValidate autoComplete="on" onSubmit={handleOnSubmit}>
                <TextField id="email" name="email" type="email" label="Email" onChange={handleOnEmailChange} />
                <TextField id="password" label="Password" type="password" onChange={handleOnPasswordChange} />
                <br />
                <Button type="submit" variant="contained" color="secondary">Submit</Button>
            </form>
        </>
    )
}

const mapStateToProps = (state: IAuthReduxProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    login,
    clearErrors
});
export default connect(mapStateToProps, { login, clearErrors })(LoginForm);