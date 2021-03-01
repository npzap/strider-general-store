import {createOrder} from "../utils/api";


export const ADD_ORDER = 'ADD_ORDER';


function addOrder(order){
    return {
        type: ADD_ORDER,
        order
    }
}

export function handleNewOrder(orderDetails, authToken){
    let id = orderDetails.customerId;
    let name = orderDetails.customerName;
    let date = orderDetails.Date;
    let total = orderDetails.Total;
    let items = orderDetails.Items;


    return (dispatch) => {
        createOrder(id, name, date, total, items, authToken);
    }
}
