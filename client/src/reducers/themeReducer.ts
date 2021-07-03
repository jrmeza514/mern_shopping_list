import { Action } from 'redux';
import {
    DARK_MODE_DISABLED,
    DARK_MODE_ENABLED
} from '../actions/types';

const initialState = {
    darkMode: false
};

export default function checkThemeEvents(state = initialState, action: Action) {
    switch (action.type) {
        case DARK_MODE_ENABLED:
            return {
                ...state,
                darkMode: true
            }
        case DARK_MODE_DISABLED:
            return {
                ...state,
                darkMode: false
            }
        default:
            return state;
    }
}