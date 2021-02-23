import { SET_ITEMS, ADD_ITEM } from "../actions/items";
import { RECEIVE_DATA, CLEAR_DATA } from "../actions/shared.js"

export default function items (state = [], action) {
    switch(action.type) {
        case ADD_ITEM :
            return state.concat([action.item]);
        case RECEIVE_DATA :
            return action.items;
        case CLEAR_DATA:
            return [];
        default:
            return state;
    }
}
