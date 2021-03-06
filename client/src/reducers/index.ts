import { combineReducers } from "redux";
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import listReducer from './listReducer';

export default combineReducers({
    shoppingList: listReducer,
    auth: authReducer,
    error: errorReducer
})