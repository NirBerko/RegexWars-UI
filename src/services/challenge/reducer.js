import {UReducer} from '../../utils';
import {combineReducers} from 'redux';

import {
    GET_ALL_CHALLENGES,
    GET_CHALLENGE
} from './constant'

const getAllChallengesReducer = UReducer.reducerHandler(GET_ALL_CHALLENGES);
const getChallengeReducer = UReducer.reducerHandler(GET_CHALLENGE);

export default combineReducers({
    allChallenges: getAllChallengesReducer,
    challenge: getChallengeReducer,
})