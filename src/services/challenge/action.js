import * as Api from './api';
import {
    GET_CHALLENGE,
} from './constant';

export const getChallenge = (id) => {
    return {
        type: GET_CHALLENGE,
        payload: Api.getChallenge(id)
    }
};