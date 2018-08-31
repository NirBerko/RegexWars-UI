import axios from "axios";

export default () => {
    axios.interceptors.request.use(function (config) {
        const token = JSON.parse(localStorage.getItem('token'));
        config.headers.common['authorization'] = `Bearer ${token}`;
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
