import * as Api from './api';
import {
    GET_USER_DETAILS,
    USER_LOGIN,
    USER_REGISTER,
    USER_LOGOUT,
} from './constant';

export const loginUser = (email, password) => {
    return {
        type: USER_LOGIN,
        payload: Api.loginUser(email, password)
    }
};

export const registerUser = (email, password) => {
    return {
        type: USER_REGISTER,
        payload: Api.registerUser(email, password)
    }
};

export const getUserDetails = () => {
    return {
        type: GET_USER_DETAILS,
        payload: Api.getUserDetails()
    }
};

export const logoutUser = () => {
    return {
        type: USER_LOGOUT,
    }
};