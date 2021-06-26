import axios from 'axios';
import { tokenConfig } from './authActions';

import { GET_LIST, LIST_LOADING, ADD_LIST, DELETE_LIST } from './types';


export const getLists = () => (dispatch: Function, getState: Function) => {

    const config = tokenConfig(getState);
    dispatch(setListsLoading());
    axios.get('/api/lists', config )
    .then( res => {
        dispatch({
            type: GET_LIST,
            payload: res.data
        })
    })
    .catch(err => {
        if(err.response.status === 401) dispatch({ type: GET_LIST, payload: []});
    });
}

export const deleteList = (id: string) => (dispatch: Function, getState: Function) => {
    const config = tokenConfig(getState);

    axios.delete(`/api/lists/${id}`, config).then( res => {
        if(res.data.success){
            dispatch({
                type: DELETE_LIST,
                payload: id
            })
        }
    }).catch( e => console.log("err"))
}

export const addList = (title: string ) => (dispatch: Function, getState: Function) => {
    const config = tokenConfig(getState);
    axios.post('/api/lists', {title}, config).then( res => {
        dispatch({
            type: ADD_LIST,
            payload: res.data
        })
    })
}

export const setListsLoading = () => {
    return { 
        type: LIST_LOADING
    }
}