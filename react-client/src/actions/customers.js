
export const ADD_CUSTOMER = 'ADD_CUSTOMER';


function addCustomer (customer) {
    return {
        type: ADD_CUSTOMER,
        customer
    }
}

