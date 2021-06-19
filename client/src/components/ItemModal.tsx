import React, {Component, useState} from 'react';
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
import { IItemModal, IItemReduxProps, ITarget } from '../types/interfaces';

const  ItemModal = ({addItem}: IItemModal) => {
    
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');

    const toggle = () => setModal(!modal);

    const handleChangeName = (e: ITarget) => {
        setName(e.target.value);
    }

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        console.log("Submit")
        addItem(name);
        setName('');
        toggle();
    }

    return (
        <div>
            <Button color="dark" 
                    style={{marginBottom: '2rem'}}
                    onClick={toggle}>Add Item</Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Add to Shopping List </ModalHeader>
                <ModalBody>
                    <Form onSubmit={e => handleOnSubmit(e)}> 
                        <FormGroup>
                            <Label for="name">Shopping List Item</Label>
                            <Input type="text" name="name" id="item" placeholder="Add a shopping item" onChange={handleChangeName} required></Input>
                            <Button color="dark" style={{marginTop: '1rem'}} type="submit" block>  Submit</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
    
}
const mapStateToProps = (state: IItemReduxProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
    item: state.item
})

export default connect(mapStateToProps, {addItem})(ItemModal);