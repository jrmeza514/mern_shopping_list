import { useState } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/ItemActions';
import AppModal from './util/AppModal';
import { IItemModal, ITarget } from '../types/interfaces';
import { Button, TextField } from '@material-ui/core';

const  ItemModal = ({addItem, toggle, open, listId, listTitle}: IItemModal) => {

    const [name, setName] = useState('');
    const handleChangeName = (e: ITarget) => setName(e.target.value);

    const handleOnSubmit = (e: any) => {
        if(!listId) return;
        e.preventDefault();
        addItem(name, listId);
        setName('');
        toggle();
    }

    return (
        <>
            <br/>
            <AppModal open={open} toggle={toggle}>
                <h3>Add item to {listTitle}</h3>
                <form onSubmit={e => handleOnSubmit(e)}> 
                    <TextField type="text" name="name" id="item" placeholder="Add a shopping item" onChange={handleChangeName} required/>
                    <Button type="submit" variant="contained" color="secondary">Submit</Button>
                </form>
            </AppModal>
        </>
    )
    
}

export default connect(null, {addItem})(ItemModal);