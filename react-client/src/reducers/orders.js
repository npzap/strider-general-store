import { ADD_ORDER } from "../actions/orders"
import { RECEIVE_DATA, CLEAR_DATA } from "../actions/shared"


export default function orders (state = [], action){
    switch(action.type){
        case ADD_ORDER:
            return state.concat([action.order]);
        case RECEIVE_DATA:
            return action.orders;
        case CLEAR_DATA:
            return [];
        default:
            return state
    }
}