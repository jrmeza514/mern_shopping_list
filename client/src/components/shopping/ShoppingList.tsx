import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ItemModal from './ItemModal';
import { IListReduxProps, IShoppingList } from '../../types/interfaces';
import { Card } from '@material-ui/core';
import { getLists, deleteList } from '../../actions/listActions';
import { deleteItem } from '../../actions/ItemActions';
import CreateListModal from './CreateListModal';
import ShoppingListHeader from './ShoppingListHeader';
import ShoppingListBody from './ShoppingListBody';

const getIndexOfSmallestColumn = (cols: number[]): number => {
    if (cols.length === 0) return 0;
    if (cols.length === 1) return 0;
    let indexOfSmallets = 0;
    let smallest = 10000;
    for (let i = 0; i < cols.length; i++) {
        if (cols[i] < smallest) {
            smallest = cols[i];
            indexOfSmallets = i;
        }
    }
    return indexOfSmallets;
}

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

    const addToList = (title: string, _id: string) => {
        setListId(_id);
        setlistTitle(title);
        setItemModalOpen(true);
    }

    const PADDING = 40;
    const SPACE_BETWEEN_ITEMTS = 10;
    const ITEM_HEIGTH_MULTIPLIER = 60;
    const STATIC_HEIGHT_MODIFIER = 75;

    let TARGET_WIDTH = 350;
    let VIEWPORT_WIDTH = window.innerWidth - PADDING;
    if (TARGET_WIDTH >= VIEWPORT_WIDTH) TARGET_WIDTH = VIEWPORT_WIDTH;
    let numberOfColums = Math.floor(VIEWPORT_WIDTH / TARGET_WIDTH);
    let columns = new Array(numberOfColums).fill(0);
    let COLUMN_WIDTH = numberOfColums === 1 ? VIEWPORT_WIDTH :
        (VIEWPORT_WIDTH / numberOfColums) - ((SPACE_BETWEEN_ITEMTS * (numberOfColums)) / (numberOfColums - 1));
    const [cardWidth, setCardWidth] = useState(COLUMN_WIDTH);

    const runSizingCalculations = () => {
        if (TARGET_WIDTH >= VIEWPORT_WIDTH) {
            TARGET_WIDTH = VIEWPORT_WIDTH
        }
        VIEWPORT_WIDTH = window.innerWidth - PADDING;
        numberOfColums = Math.floor(VIEWPORT_WIDTH / TARGET_WIDTH);
        columns = new Array(numberOfColums).fill(0);
        COLUMN_WIDTH = numberOfColums === 1 ? VIEWPORT_WIDTH :
            (VIEWPORT_WIDTH / numberOfColums) - ((SPACE_BETWEEN_ITEMTS * numberOfColums) / (numberOfColums - 1));
        setCardWidth(
            COLUMN_WIDTH
        );
    }

    if (!isAuthenticated) return null;

    window.onresize = () => {
        runSizingCalculations();
    };



    return (
        <>
            <CreateListModal />
            <ItemModal open={itemModalOpen} toggle={toggle} listId={listId} listTitle={listTitle} />
            <div className="sl-card-container">
                {lists.map(({ _id, title, items }) => {
                    const colIndex = getIndexOfSmallestColumn(columns);
                    let transYVal = columns[colIndex];
                    let transXVal = (colIndex * cardWidth) + SPACE_BETWEEN_ITEMTS * colIndex;

                    columns[colIndex] += items.length * ITEM_HEIGTH_MULTIPLIER + STATIC_HEIGHT_MODIFIER;


                    return (
                        <Card key={_id} className="card" style={{
                            width: cardWidth,
                            transform: `
                            translateX(${transXVal}px)
                            translateY(${transYVal}px)
                            `
                        }}>
                            <ShoppingListHeader title={title} _id={_id} addToList={addToList}></ShoppingListHeader>
                            <ShoppingListBody items={items} deleteItem={deleteItem} listId={_id} />
                        </Card>
                    )
                })}
            </div>
        </>
    )

}

const mapStateToProps = (state: IListReduxProps) => ({
    shoppingList: state.shoppingList,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getLists, deleteList, deleteItem })(ShoppingList);