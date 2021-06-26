import { useState } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/ItemActions';
import AppModal from './util/AppModal';
import { IItemModal, ITarget } from '../types/interfaces';
import { Button, TextField } from '@material-ui/core';

const  ItemModal = ({addItem}: IItemModal) => {

    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const toggle = () => setModal(!modal);

    const handleChangeName = (e: ITarget) => setName(e.target.value);

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        addItem(name);
        setName('');
        toggle();
    }

    return (
        <>
            <br/>
            <Button variant="contained" color="secondary" onClick={toggle}>Add Item</Button>
            <AppModal open={modal} toggle={toggle}>
                <h3>Add New Item </h3>
                <form onSubmit={e => handleOnSubmit(e)}> 
                    <TextField type="text" name="name" id="item" placeholder="Add a shopping item" onChange={handleChangeName} required/>
                    <Button type="submit">Submit</Button>
                </form>
            </AppModal>
        </>
    )
    
}

export default connect(null, {addItem})(ItemModal);