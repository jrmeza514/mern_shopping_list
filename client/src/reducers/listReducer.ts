import { GET_LIST, ADD_LIST, DELETE_LIST, LIST_LOADING, ADD_ITEM, DELETE_ITEM } from '../actions/types'
import { IAction, IExistingItem, IExistingList, IList } from '../types/interfaces';

const initialState = {
    lists: [],
    loading: false
};

interface IState {
    lists: IExistingList[]
}

export default function checkItemEvents( state:IState = initialState, action:IAction ){
    switch(action.type){
        case GET_LIST:
            return {
                ...state,
                lists: action.payload,
                loading: false
            }
        case DELETE_LIST:
            return {
                ...state, 
                lists: state.lists.filter(list => list._id !== action.payload)
            }
        case ADD_LIST:
            const{_id, title } = action.payload;
            return{
                ...state, 
                lists: [...state.lists, {_id, title, items: []}]
            }
        case LIST_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_ITEM:
            return {
                ...state,
                lists: state.lists.map( (list: IExistingList) => {
                    if(list._id != action.payload.listId) return list;
                    
                    return {
                        ...list,
                        items: [
                            ...list.items,
                            action.payload.item
                        ]
                    }
                })
            }

        case DELETE_ITEM:
            
            return {
                ...state,
                lists: state.lists.map( (list: IExistingList) => {
                    if(list._id != action.payload.listId) return list;
                    
                    return {
                        ...list,
                        items: list.items.filter( (item: IExistingItem) => {
                            return item._id != action.payload.itemId
                        })
                    }
                })
            }

           
        default:
            return state
    }
}
