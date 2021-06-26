import {useEffect} from 'react';
import {connect} from 'react-redux';
import { getItems, deleteItem, addItem } from '../actions/ItemActions';
import ItemModal from './ItemModal';
import { IItemReduxProps, IShoppingList } from '../types/interfaces';
import { IconButton, List, ListItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const ShoppingList = ( {shoppingList, isAuthenticated, getItems, deleteItem}: IShoppingList) => {
    const {items} = shoppingList;
    useEffect(() => {
        if(isAuthenticated) getItems();
    }, [getItems, isAuthenticated])

    const onDeleteClick = (id: string) => {
        deleteItem(id);
    };
    
    if(!isAuthenticated) return null;

    return(
        <>
            <ItemModal/>
            <List>
                {items.map( ({_id, name}) => (
                    <ListItem style={{padding: '0px'}}>
                        <IconButton onClick={() => onDeleteClick(_id)}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                        {name}
                    </ListItem>
                ))}
            </List>
        </>
    )
    
}

const mapStateToProps = (state: IItemReduxProps) => ({
    shoppingList: state.shoppingList,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {getItems, deleteItem, addItem})(ShoppingList);