import { combineReducers } from "redux";
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    shoppingList: itemReducer,
    auth: authReducer,
    error: errorReducer
})