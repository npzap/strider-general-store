import { loginUser } from "../utils/api.js";
import { showLoading, hideLoading} from "react-redux-loading";
import {handleInitialData, handleClearData} from "./shared";

export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const REMOVE_AUTHED_USER = 'REMOVE_AUTHED_USER'

export function setAuthedUser (username, authToken) {
    return {
        type: SET_AUTHED_USER,
        username,
        authToken
    }
}

export function removeAuthedUser () {
    return {
        type: REMOVE_AUTHED_USER
    }
}

export function handleLogin(username, password) {
    return (dispatch) => {
        dispatch(showLoading());
        loginUser((username, password)).then(
            (data) => {
                dispatch(setAuthedUser(username, data.accessToken));
                dispatch(handleInitialData(data.accessToken));
            },
            (err) => console.log("User login failed: " + err)
        )
        .then(() => {
            dispatch(hideLoading())
        });
    }
}

export function handleLogout(){
    return (dispatch) => {
        dispatch(showLoading());
        Promise.all([
            dispatch(removeAuthedUser()),
            dispatch(handleClearData())
        ]).then(() => {
            dispatch(hideLoading())
        });
    }
}