import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from "../../actions/authActions";

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

class LoginModal extends Component {

    state = {
        modal: false,
        msg: null,
        email: '',
        password: ''
    }

    static propTypes = {
        isAuthenticaed: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.login( email, password );
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props;

        if(error !== prevProps.error) {
            if (error.id === 'LOGIN_FAILED') {
                this.setState({msg: error.msg})
            }else{
                this.setState({msg: null})
            }
        }

        if (this.state.modal) {
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    render(){
        return (
            <div>
                <NavLink onClick={this.toggle} href="#"> Login </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}> Login </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                
                                <Label for="email"> Email </Label>
                                <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange} className="mb-3"></Input>

                                <Label for="password"> Password </Label>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} className="mb-3"></Input>

                                <Button color="dark" style={{marginTop: '1rem'}} type="submit" block>  Login </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    login
});
export default connect(mapStateToProps, {login})(LoginModal);