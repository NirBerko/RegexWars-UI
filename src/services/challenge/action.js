import * as Api from './api';
import {
    GET_CHALLENGE,
    GET_ALL_CHALLENGES,
    SEND_SOLUTION
} from './constant';

export const getAllChallenges = () => ({
    type: GET_ALL_CHALLENGES,
    payload: Api.getAllChallenges()
});

export const getChallenge = (id) => ({
    type: GET_CHALLENGE,
    payload: Api.getChallenge(id)
});

export const sendSolution = (id, {regexText, regexMode, replaceWith}) => ({
    type: SEND_SOLUTION,
    payload: Api.sendSolution(id, {regexText, regexMode, replaceWith})
});