import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ItemModal from './ItemModal';
import { IExistingList, IListReduxProps, IShoppingList } from '../../types/interfaces';
import { Card } from '@material-ui/core';
import { getLists } from '../../actions/listActions';
import { deleteItem } from '../../actions/ItemActions';
import CreateListModal from './CreateListModal';
import ShoppingListHeader from './ShoppingListHeader';
import ShoppingListBody from './ShoppingListBody';

const ITEM_HEIGTH_MULTIPLIER = 60;
const STATIC_HEIGHT_MODIFIER = 75;
const TARGET_WIDTH = 350;

const getIndexOfSmallestColumn = (cols: number[]): number => {
    if (cols.length < 2) return 0
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

const calculateNumberOfColumns = (container: HTMLElement | null): number => {
    if (!container) return 0;
    const containerWidth = container.clientWidth;
    const ACTUAL_WIDRH = TARGET_WIDTH >= containerWidth ? containerWidth : TARGET_WIDTH;
    const numberOfColums = Math.floor((containerWidth) / ACTUAL_WIDRH);
    return numberOfColums;
}

const sortShoppingListByNumberOfItems = (a: IExistingList, b: IExistingList) => {
    return b.items.length - a.items.length
}

const ShoppingList = ({ shoppingList, isAuthenticated, getLists, deleteItem }: IShoppingList) => {
    const { lists } = shoppingList;
    const [listId, setListId] = useState<string | null>(null);
    const [listTitle, setlistTitle] = useState<string | null>(null);
    const [itemModalOpen, setItemModalOpen] = useState(false);
    const slCardContainerRef = useRef<HTMLDivElement | null>(null);
    const [numCols, setNumCols] = useState(calculateNumberOfColumns(slCardContainerRef.current));
    const toggle = () => setItemModalOpen(!itemModalOpen);

    const addToList = (title: string, _id: string) => {
        setListId(_id);
        setlistTitle(title);
        setItemModalOpen(true);
    }

    const runSizingCalculations = () => {
        const updatedNumCols = calculateNumberOfColumns(slCardContainerRef.current);
        if (numCols === updatedNumCols) return;
        setNumCols(updatedNumCols);
    }

    useLayoutEffect(() => {
        runSizingCalculations();
        window.addEventListener('resize', runSizingCalculations);
        return () => window.removeEventListener('resize', runSizingCalculations);
    });

    useEffect(() => {
        if (isAuthenticated) getLists();
    }, [getLists, isAuthenticated]);

    if (!isAuthenticated) return null;

    return (
        <>
            <CreateListModal />
            <ItemModal open={itemModalOpen} toggle={toggle} listId={listId} listTitle={listTitle} />
            <div className="sl-card-container" id='sl-card-container' ref={slCardContainerRef}>
                {
                    (() => {
                        runSizingCalculations();
                        const columns = new Array(numCols).fill(0);
                        return lists.sort(sortShoppingListByNumberOfItems).map(({ _id, title, items }) => {
                            const colIndex = getIndexOfSmallestColumn(columns);
                            const transYVal = columns[colIndex];
                            columns[colIndex] += items.length * ITEM_HEIGTH_MULTIPLIER + STATIC_HEIGHT_MODIFIER;
                            return (
                                <div key={_id} className={`sl-card-wrapper sl-grid-${columns.length}`} style={{ transform: `translateY(${transYVal}px)` }}>
                                    <Card className={`card sl-col-${colIndex}`}  >
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