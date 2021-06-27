import { IExistingItem } from '../../types/interfaces';
import { IconButton, List, ListItem } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import Web from '@material-ui/icons/AddShoppingCart';

interface ShoppingListBodyProps {
    items: IExistingItem[],
    listId: string,
    deleteItem(id: string, listId: string): void
}

const ShoppingListBody = ({ items, listId, deleteItem }: ShoppingListBodyProps) => {


    return (
        <List>
            {items.map((item: IExistingItem) => (
                <ListItem key={item._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="left">

                        <IconButton color="primary" target="_blank" href={`https://www.amazon.com/s?k=${item.name.split(" ").join("+")}`}>
                            <Web fontSize="small" />
                        </IconButton>
                        {item.name}
                    </div>
                    <IconButton onClick={() => { deleteItem(item._id, listId) }} color="secondary">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    )
}

export default ShoppingListBody;