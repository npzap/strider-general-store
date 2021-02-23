import { combineReducers } from "redux";
import customers from './customers';
import items from './items';
import authedUser from './authedUser';
import orders from './orders';
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
    customers,
    items,
    orders,
    authedUser,
    loadingBar: loadingBarReducer
});
