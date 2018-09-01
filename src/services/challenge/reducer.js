import {UReducer} from '../../utils';
import {combineReducers} from 'redux';

import {
    GET_ALL_CHALLENGES,
    GET_CHALLENGE,
    SEND_SOLUTION
} from './constant'

const getAllChallengesReducer = UReducer.reducerHandler(GET_ALL_CHALLENGES);
const getChallengeReducer = UReducer.reducerHandler(GET_CHALLENGE);
const sendSolutionReducer = UReducer.reducerHandler(SEND_SOLUTION);

export default combineReducers({
    allChallenges: getAllChallengesReducer,
    challenge: getChallengeReducer,
    sendSolution: sendSolutionReducer,
})