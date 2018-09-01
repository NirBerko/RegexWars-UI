import * as Api from './api';
import {
    GET_CHALLENGE,
    GET_ALL_CHALLENGES
} from './constant';

export const getAllChallenges = () => {
    return {
        type: GET_ALL_CHALLENGES,
        payload: Api.getAllChallenges()
    }
};

export const getChallenge = (id) => {
    return {
        type: GET_CHALLENGE,
        payload: Api.getChallenge(id)
    }
};