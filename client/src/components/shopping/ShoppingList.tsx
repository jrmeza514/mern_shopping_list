import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ItemModal from '../ItemModal';
import { IListReduxProps, IShoppingList } from '../../types/interfaces';
import { Card } from '@material-ui/core';
import { getLists, deleteList } from '../../actions/listActions';
import { deleteItem } from '../../actions/ItemActions';
import CreateListModal from '../CreateListModal';
import ShoppingListHeader from './ShoppingListHeader';
import ShoppingListBody from './ShoppingListBody';

const ShoppingList = ({ shoppingList, isAuthenticated, getLists, deleteList, deleteItem }: IShoppingList) => {
    const { lists } = shoppingList;
    useEffect(() => {
        if (isAuthenticated) getLists();
    }, [getLists, isAuthenticated])

    const [listId, setListId] = useState<string | null>(null);
    const [listTitle, setlistTitle] = useState<string | null>(null);
    const [itemModalOpen, setItemModalOpen] = useState(false);
    const toggle = () => {
        setItemModalOpen(!itemModalOpen);
    };

    if (!isAuthenticated) return null;

    const addToList = (title: string, _id: string) => {
        setListId(_id);
        setlistTitle(title);
        setItemModalOpen(true);
    }

    return (
        <>
            <CreateListModal />
            <ItemModal open={itemModalOpen} toggle={toggle} listId={listId} listTitle={listTitle} />
            <div className="sl-card-container">
                {lists.map(({ _id, title, items }) => (
                    <Card key={_id} className="card">
                        <ShoppingListHeader title={title} _id={_id} addToList={addToList}></ShoppingListHeader>
                        <ShoppingListBody items={items} deleteItem={deleteItem} listId={_id} />
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

export default connect(mapStateToProps, { getLists, deleteList, deleteItem })(ShoppingList);