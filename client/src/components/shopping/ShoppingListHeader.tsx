import { connect } from 'react-redux';
import { IconButton, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { deleteList } from '../../actions/listActions';
import ShoppingListContextMenu from './ShoppingListContextMenu';

interface ShoppingListHeaderProps {
    deleteList(id: string): void,
    title: string,
    _id: string,
    addToList(title: string, _id: string): void

}

const ShoppingListHeader = ({ deleteList, title, _id, addToList }: ShoppingListHeaderProps) => {

    const handleDelete = () => {
        const check = window.confirm(`Are you sure you want to delete ${title}`);
        if (check) {
            deleteList(_id);
        }
    }

    return (
        <div className="card-header">
            <div className="left">
                <Typography className="sl-title" component="div"> {title} </Typography>
                <IconButton onClick={() => { addToList(title, _id) }} color="secondary">
                    <AddIcon fontSize="small" />
                </IconButton>
            </div>
            <ShoppingListContextMenu deleteList={handleDelete} />
        </div>
    )

}

export default connect(null, { deleteList })(ShoppingListHeader);