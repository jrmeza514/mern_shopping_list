import axios from 'axios';
import { returnErrors } from './errorActions';
import { IAuthFunction } from '../types/interfaces';
import { getItems } from './ItemActions';
import { getLists } from './listActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    GET_ITEMS,
    CLEAR_SHOPPING_LIST
} from '../actions/types';
import { IConfigHeaders } from '../types/interfaces';

// Login Action
export const login = ({ email, password }: IAuthFunction) => (dispatch: Function) => {
    const config = {
        headers: { "Content-type": "application/json" }
    };

    const body = JSON.stringify({ email, password });

    axios.post('/api/auth', body, config)
        .then(res => {
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            dispatch(getItems());
            dispatch(getLists());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.status, 'LOGIN_FAILED'));
            dispatch({ type: LOGIN_FAIL });
        });

}

// Logout Action
export const logout = () => (dispatch: Function) => {
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch({ type: GET_ITEMS, payload: [] });
    dispatch({ type: CLEAR_SHOPPING_LIST });
}

export const register = ({ name, email, password }: any) => (dispatch: Function) => {
    const config = {
        headers: { "Content-type": "application/json" }
    };

    const body = JSON.stringify({ name, email, password });

    axios.post('/api/users', body, config)
        .then(res => {
            dispatch({ type: REGISTER_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.status, 'REGISTER_FAILED'));
            dispatch({ type: REGISTER_FAIL });
        })

}

export const loadUser = () => (dispatch: Function, getState: Function) => {
    dispatch({ type: USER_LOADING });


    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.status));
            dispatch({ type: AUTH_ERROR });
        });
}

export const tokenConfig = (getState: Function) => {
    const token = getState().auth.token;

    const config: IConfigHeaders = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}