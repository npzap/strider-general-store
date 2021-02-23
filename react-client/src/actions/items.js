
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';


function addItem (item) {
    return {
        type: ADD_ITEM,
        item
    }
}

function updateItem (id, item) {
    return {
        type: UPDATE_ITEM,
        id,
        item
    }
}

export function handleAddItem(){

}

export function handleUpdateItem(){

}
