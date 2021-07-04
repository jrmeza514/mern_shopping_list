import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    DARK_MODE_DISABLED,
    DARK_MODE_ENABLED
} from '../actions/types';
import { IUserState } from '../types/interfaces';

interface AuthSate {
    token: string | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    user: IUserState | null
}

const initialState: AuthSate = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    user: null
};

export default function checkAuthEvents(state = initialState, action: any) {
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
        case DARK_MODE_ENABLED:
            if (!state || !state.user) return state;
            return {
                ...state,
                user: {
                    ...state.user,
                    userPrefs: {
                        ...state.user.userPrefs,
                        theme: "THEME_DARK"
                    }
                }
            }
        case DARK_MODE_DISABLED:
            if (!state || !state.user) return state;
            return {
                ...state,
                user: {
                    ...state.user,
                    userPrefs: {
                        ...state.user.userPrefs,
                        theme: "THEME_LIGHT"
                    }
                }
            }
        default:
            return state;
    }
}