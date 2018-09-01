import axios from 'axios'

export const loginUser = async (email, password) => {
    return await axios.post(`/auth/login`, {email, password}).then(res => res.data);
};

export const getUserDetails = async () => {
    return await axios.get(`/userDetails`).then(res => res.data);
};