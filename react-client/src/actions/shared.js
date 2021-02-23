import { getCustomers, getItems, getOrders} from "../utils/api.js";
import { showLoading, hideLoading} from "react-redux-loading";

export const RECEIVE_DATA = 'RECEIVE_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';

function receiveData(customers, items, orders){
    return {
        type: RECEIVE_DATA,
        customers,
        items,
        orders
    }
}

function clearData(){
    return {
        type: CLEAR_DATA
    }
}

export function handleInitialData(authToken) {
    return (dispatch) => {
        dispatch(showLoading());
        Promise.all([
            getCustomers(authToken),
            getItems(authToken),
            getOrders(authToken)
        ]).then( ([customers, items, orders]) => {
            dispatch(receiveData(customers, items, orders));
            }
        ).then(dispatch(hideLoading()));
    }
}

export function handleClearData() {
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(clearData).then(
            dispatch(hideLoading())
        );
    }
}