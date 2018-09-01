import typeToReducer from "type-to-reducer";
import {combineReducers} from 'redux';

import {UAuthenticated, UReducer} from "../../utils";

import {
    USER_LOGIN,
    GET_USER_DETAILS
} from './constant'

const initialState = {
    data: null,
    isPending: false,
    error: false
};

const userLoginReducer = typeToReducer({
    [USER_LOGIN]: {
        PENDING: () => ({
            ...initialState,
            isPending: true
        }),
        REJECTED: (state, action) => ({
            ...initialState,
            error: action.payload,
        }),
        FULFILLED: (state, action) => {
            UAuthenticated.setAuthentication(action.payload.token);
            return {
                ...initialState,
                data: action.payload,
            };
        }
    }
}, initialState);

const userDetailsReducer = UReducer.reducerHandler(GET_USER_DETAILS);

export default combineReducers({
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
})