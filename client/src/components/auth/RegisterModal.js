import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {register, logout} from '../../actions/authActions';
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


class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func,
        clearErrors: PropTypes.func,
        logout: PropTypes.func
    }

    toggle = () => {

        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {name, email, password} = this.state;
        const newUser = {name,email,password};
        this.props.register(newUser);
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props;

        if(error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL') {
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
                <NavLink onClick={this.toggle} href="#"> Register </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}> Register </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name"> Name </Label>
                                <Input type="text" name="name" id="name" placeholder="Name" onChange={this.onChange} className="mb-3"></Input>
                                
                                <Label for="email"> Email </Label>
                                <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange} className="mb-3"></Input>

                                <Label for="password"> Password </Label>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} className="mb-3" autocomplete='new-password'></Input>

                                <Button color="dark" style={{marginTop: '1rem'}} type="submit" block>  Register </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    register,
    clearErrors,
    logout
})

export default connect(mapStateToProps, {register, clearErrors, logout})(RegisterModal);