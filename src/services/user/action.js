import * as Api from './api';
import {
    GET_USER_DETAILS,
    USER_LOGIN,
} from './constant';

export const loginUser = (email, password) => {
    return {
        type: USER_LOGIN,
        payload: Api.loginUser(email, password)
    }
};

export const getUserDetails = () => {
    return {
        type: GET_USER_DETAILS,
        payload: Api.getUserDetails()
    }
};