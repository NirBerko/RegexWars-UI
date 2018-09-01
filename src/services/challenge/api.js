import axios from 'axios'

export const getAllChallenges = async () => {
    return await axios.get(`/challenge/all`).then(res => res.data);
};

export const getChallenge = async (id) => {
    return await axios.get(`/challenge/${id}`).then(res => res.data);
};