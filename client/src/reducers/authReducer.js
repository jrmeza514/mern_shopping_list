import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
};

export default function checkAuthEvents( state = initialState, action ) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true
            }

        case AUTH_ERROR: 
        case LOGIN_FAIL:
        case REGISTER_FAIL:  
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return { 
                ...state,
                token: null,
                user: null, 
                isAuthenticated: false,
                isLoading: false
            }

        default:
            return state;
    }
}