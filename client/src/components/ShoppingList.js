import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import { getItems, deleteItem, addItem } from '../actions/ItemActions';
import PropTypes from 'prop-types';
import ItemModal from './ItemModal';


class ShoppingList extends Component {
    
    componentDidMount(){
        this.props.getItems();
    }

    onDeleteClick(id){
        this.props.deleteItem(id);
    }
    
    componentDidUpdate(prevProps){
        if (this.props.isAuthenticated != prevProps.isAuthenticated ) {
            this.props.getItems();
        }
    }

    render(){
        const {items} = this.props.item;

        if(!this.props.isAuthenticated) return null;

        return(
            <Container>
                <ItemModal/>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map( ({_id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade"> 
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
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
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {getItems, deleteItem, addItem})(ShoppingList);