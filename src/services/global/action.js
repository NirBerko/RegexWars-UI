import {
    SET_PAGE_TITLE,
} from './constant';

export const setPageTitle = (title) => {
    return {
        type: SET_PAGE_TITLE,
        payload: title
    }
};