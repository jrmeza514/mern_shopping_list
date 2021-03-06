import { useState } from 'react';
import { connect } from 'react-redux';
import { addList } from '../../actions/listActions';
import AppModal from '../util/AppModal';
import { IListModal, ITarget } from '../../types/interfaces';
import { Button, TextField } from '@material-ui/core';

const CreateListModal = ({ addList }: IListModal) => {

    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const toggle = () => setModal(!modal);

    const handleChangeName = (e: ITarget) => setName(e.target.value);

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        addList(name);
        setName('');
        toggle();
    }

    return (
        <>
            <Button variant="contained" color="secondary" onClick={toggle} className="create-list-btn">Create New List</Button>
            <AppModal open={modal} toggle={toggle}>
                <h3>Create New List </h3>
                <form onSubmit={e => handleOnSubmit(e)}>
                    <TextField type="text" name="name" id="item" placeholder="Shopping List Title" onChange={handleChangeName} required />
                    <Button type="submit" variant="contained" color="secondary">Submit</Button>
                </form>
            </AppModal>
        </>
    )

}

export default connect(null, { addList })(CreateListModal);