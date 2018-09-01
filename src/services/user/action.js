import * as Api from './api';
import {
    GET_USER_DETAILS,
} from './constant';

export const getUserDetails = () => {
    return {
        type: GET_SYSTEM_ANALYTICS,
        payload: Api.getUserDetails()
    }
};