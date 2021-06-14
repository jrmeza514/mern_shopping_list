import axios from 'axios';
import { disconnect } from 'mongoose';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';


export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/items')
    .then( res => {
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    })
}

export const deleteItem = id => dispatch => {
    axios.delete(`/api/items/${id}`).then( res => {
        if(res.data.success){
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        }
    }).catch( e => console.log("err"))
}

export const addItem = name => dispatch => {
   axios.post('/api/items', {name: name}).then( res => {
       console.log(res);
       dispatch({
           type: ADD_ITEM,
           payload: res.data
       })
   })
}

export const setItemsLoading = () => {
    return { 
        type: ITEMS_LOADING
    }
}