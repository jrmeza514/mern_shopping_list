import {useEffect} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import { getItems, deleteItem, addItem } from '../actions/ItemActions';
import ItemModal from './ItemModal';
import { IItemReduxProps, IShoppingList } from '../types/interfaces';


const ShoppingList = ( {item, isAuthenticated, getItems, deleteItem}: IShoppingList) => {
    const {items} = item;
    useEffect(() => {
        getItems();
    }, [getItems])

    const onDeleteClick = (id: string) => {
        deleteItem(id);
    };


        if(!isAuthenticated) return null;

    return(
        <Container>
            <ItemModal/>
            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {items.map( ({_id, name}) => (
                        <CSSTransition key={_id} timeout={5} classNames="fade"> 
                            <ListGroupItem>
                                <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={() => onDeleteClick(_id)}
                                >&times;</Button>
                                {name}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    )
    
}

const mapStateToProps = (state: IItemReduxProps) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {getItems, deleteItem, addItem})(ShoppingList);