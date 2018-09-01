import {
    SET_PAGE_TITLE
} from './constant'

const defaultVars = {
    title: null,
};

export default (state, action) => {
    switch(action.type) {
        case SET_PAGE_TITLE:
            return Object.assign({}, state, {title: action.payload});
        default:
    }

    return defaultVars;
}