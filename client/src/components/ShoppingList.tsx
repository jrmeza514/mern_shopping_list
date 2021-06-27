import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import ItemModal from './ItemModal';
import { IListReduxProps, IShoppingList, IItem, IExistingList } from '../types/interfaces';
import { Card, IconButton, List, ListItem } from '@material-ui/core';
import {Delete as DeleteIcon, Add as AddIcon} from '@material-ui/icons';
import Web from '@material-ui/icons/AddShoppingCart';
import { getLists, deleteList } from '../actions/listActions';
import { deleteItem } from '../actions/ItemActions';
import CreateListModal from './CreateListModal';

const ShoppingList = ( {shoppingList, isAuthenticated, getLists, deleteList, deleteItem}: IShoppingList) => {
    const {lists} = shoppingList;
    useEffect(() => {
        if(isAuthenticated) getLists();
    }, [getLists, isAuthenticated])

    const [listId, setListId] = useState<string | null>(null);
    const [listTitle, setlistTitle] = useState<string | null>(null);
    const [itemModalOpen, setItemModalOpen] = useState(false);
    const toggle = () => {
        setItemModalOpen(!itemModalOpen);  
    };

    const onDeleteList = ( id: string | null  ) => {
        if(!id) return;
        const proceed = window.confirm("Are you sure you want to delete this list?");
        if(proceed) deleteList(id);

    }
    
    const onDeleteItem = (id: string | null | undefined, listId: string | null | undefined ) => {
        if(!id || !listId) return;
        deleteItem(id, listId);
    }

    if(!isAuthenticated) return null;

    const addToList = ({title, _id}: IExistingList) => {
        setListId(_id);
        setlistTitle(title);
        setItemModalOpen(true);
    }

    return(
        <>
            <CreateListModal/>
            <ItemModal open={itemModalOpen} toggle={toggle} listId={listId} listTitle={listTitle}/>
            <div className="sl-card-container">
                {lists.map(({_id, title, items}) => (
                    <Card key={_id} className="card">
                        <div className="card-header">
                            <div className="left">
                                <h3>{title}</h3>
                                <IconButton onClick={() => {addToList({title, _id, items})}} color="secondary">
                                    <AddIcon fontSize="small"/>
                                </IconButton>
                            </div>
                            <IconButton onClick={() => { onDeleteList(_id) }} color="secondary">
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </div>
                        <List>
                            {items.map( (item: IItem) => (
                                <ListItem key={item._id} style={{display: 'flex', justifyContent:'space-between'}}>
                                    <div className="left">
                                        
                                        <IconButton color="primary" target="_blank" href={`https://www.amazon.com/s?k=${item.name.split(" ").join("+")}`}>
                                            <Web fontSize="small"/>
                                        </IconButton>
                                        {item.name}
                                    </div>
                                    <IconButton  onClick={() => onDeleteItem(item._id, _id)} color="secondary">
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                ))}
            </div>
        </>
    )
    
}

const mapStateToProps = (state: IListReduxProps) => ({
    shoppingList: state.shoppingList,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {getLists, deleteList, deleteItem})(ShoppingList);