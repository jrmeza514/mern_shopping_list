import axios from 'axios';
import { tokenConfig } from './authActions';

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';


export const getItems = () => (dispatch: Function, getState: Function) => {
    const config = tokenConfig(getState);
    dispatch(setItemsLoading());
    axios.get('/api/items', config)
    .then( res => {
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    })
    .catch(err => {
        if(err.response.status === 401) dispatch({ type: GET_ITEMS, payload: []});
    });
}

export const deleteItem = (id: string) => (dispatch: Function, getState: Function) => {
    const config = tokenConfig(getState);

    axios.delete(`/api/items/${id}`, config).then( res => {
        if(res.data.success){
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        }
    }).catch( e => console.log("err"))
}

export const addItem = (name: string) => (dispatch: Function, getState: Function) => {
    const config = tokenConfig(getState);
    axios.post('/api/items', {name: name}, config).then( res => {
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