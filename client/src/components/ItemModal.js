import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/ItemActions';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form, 
    FormGroup,
    Label,
    Input
} from 'reactstrap';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("Submit")
        this.props.addItem(this.state.name);
        this.setState({
            ...this.state,
            name: ''
        });
        this.toggle();
    }

    render(){
        return (
            <div>
                <Button color="dark" 
                        style={{marginBottom: '2rem'}}
                        onClick={this.toggle}>Add Item</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this,this.toggle}> Add to Shopping List </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Shopping List Item</Label>
                                <Input type="text" name="name" id="item" placeholder="Add a shopping item" onChange={this.onChange} required></Input>
                                <Button color="dark" style={{marginTop: '1rem'}} type="submit" block>  Submit</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    item: state.item
})

export default connect(mapStateToProps, {addItem})(ItemModal);