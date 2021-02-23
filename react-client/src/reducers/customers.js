import { ADD_CUSTOMER } from "../actions/customers";
import { RECEIVE_DATA, CLEAR_DATA } from "../actions/shared"

export default function customers (state = [], action) {
    switch(action.type) {
        case ADD_CUSTOMER :
            return state.concat([action.customer]);
        case RECEIVE_DATA :
            return action.customers;
        case CLEAR_DATA:
            return [];
        default:
            return state;
    }
}
