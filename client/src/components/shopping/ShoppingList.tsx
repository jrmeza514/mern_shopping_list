import { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import ItemModal from './ItemModal';
import { IExistingList, IListReduxProps, IShoppingList } from '../../types/interfaces';
import { Card } from '@material-ui/core';
import { getLists } from '../../actions/listActions';
import { deleteItem } from '../../actions/ItemActions';
import CreateListModal from './CreateListModal';
import ShoppingListHeader from './ShoppingListHeader';
import ShoppingListBody from './ShoppingListBody';

const PADDING = 20;
const ITEM_HEIGTH_MULTIPLIER = 60;
const STATIC_HEIGHT_MODIFIER = 75;

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

const ShoppingList = ({ shoppingList, isAuthenticated, getLists, deleteItem }: IShoppingList) => {
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

    let TARGET_WIDTH = 350;
    const [numCols, setNumCols] = useState(-1);

    const runSizingCalculations = () => {
        const VIEWPORT_WIDTH = window.innerWidth - PADDING * 2;
        const ACTUAL_WIDRH = TARGET_WIDTH >= VIEWPORT_WIDTH ? VIEWPORT_WIDTH : TARGET_WIDTH;
        const numberOfColums = Math.floor((VIEWPORT_WIDTH) / ACTUAL_WIDRH);
        if (numCols === numberOfColums) return;
        setNumCols(numberOfColums);
    }

    useLayoutEffect(() => {
        runSizingCalculations();
        window.addEventListener('resize', runSizingCalculations);
        return () => window.removeEventListener('resize', runSizingCalculations);
    });

    if (!isAuthenticated) return null;

    return (
        <>
            <CreateListModal />
            <ItemModal open={itemModalOpen} toggle={toggle} listId={listId} listTitle={listTitle} />
            <div className="sl-card-container">
                {
                    (() => {
                        const VW_WIDTH = (window.innerWidth - PADDING * 2);
                        const columns = new Array(Math.floor(VW_WIDTH / TARGET_WIDTH)).fill(0);
                        return lists.sort((a: IExistingList, b: IExistingList) => { return b.items.length - a.items.length })
                            .map(({ _id, title, items }) => {
                                const colIndex = getIndexOfSmallestColumn(columns);
                                const transYVal = columns[colIndex];
                                columns[colIndex] += items.length * ITEM_HEIGTH_MULTIPLIER + STATIC_HEIGHT_MODIFIER;

                                return (
                                    <div key={_id} className="colwrapper" style={{ transform: `translateY(${transYVal}px)` }}>
                                        <Card className={`card sl-col-${colIndex} sl-grid-${columns.length}`}  >
                                            <ShoppingListHeader title={title} _id={_id} addToList={addToList}></ShoppingListHeader>
                                            <ShoppingListBody items={items} deleteItem={deleteItem} listId={_id} />
                                        </Card>
                                    </div>
                                )
                            })
                    })()
                }
            </div>
        </>
    )

}

const mapStateToProps = (state: IListReduxProps) => ({
    shoppingList: state.shoppingList,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getLists, deleteItem })(ShoppingList);