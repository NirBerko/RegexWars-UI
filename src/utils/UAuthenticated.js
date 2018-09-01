const getAuthenticationToken = () => {
    return localStorage.getItem('access_token');
};

const setAuthentication = (token) => {
    localStorage.setItem('access_token', token);
};

const removeAuthentication = () => {
    localStorage.removeItem('access_token');
};

export default {
    getAuthenticationToken,
    setAuthentication,
    removeAuthentication
}