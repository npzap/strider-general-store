
export const ADD_ORDER = 'ADD_ORDER';


function addOrder(order){
    return {
        type: ADD_ORDER,
        order
    }
}