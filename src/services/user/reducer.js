import typeToReducer from "type-to-reducer";
import {combineReducers} from 'redux';

import {UAuthenticated} from "../../utils";

import {
    USER_LOGIN,
    USER_REGISTER,
    GET_USER_DETAILS,
    USER_LOGOUT,
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
                data: action.payload.user,
            };
        }
    },
    [USER_REGISTER]: {
        FULFILLED: (state, action) => {
            UAuthenticated.setAuthentication(action.payload.token);
            return {
                ...initialState,
                data: action.payload.user,
            };
        }
    }
}, initialState);

const userRegisterReducer = typeToReducer({
    [USER_REGISTER]: {
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

const userDetailsReducer = typeToReducer({
    [ GET_USER_DETAILS ]: {
        PENDING: () => ({
            ...initialState,
            isPending: true
        }),
        REJECTED: (state, action) => ({
            ...initialState,
            error: action.payload,
        }),
        FULFILLED: (state, action) => ({
            ...initialState,
            data: action.payload
        })
    },
    [ USER_LOGOUT ]: () => {
        return initialState;
    },
}, initialState);

export default combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
})