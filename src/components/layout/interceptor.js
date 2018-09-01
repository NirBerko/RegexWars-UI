import axios from "axios";

import {UAuthenticated} from '../../utils'

export default () => {
    console.log(process.env.REACT_APP_API_URL)
    axios.interceptors.request.use(function (config) {
        config.headers.common['authorization'] = `Bearer ${UAuthenticated.getAuthenticationToken()}`;
        config.headers.common['Content-Type'] = 'application/json';
        config.url = process.env.REACT_APP_API_URL + config.url;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });


    // Response interceptor
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        return Promise.reject(error);
    });
};
