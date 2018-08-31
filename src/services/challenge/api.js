import axios from 'axios'

export const getChallenge = async (id) => {
    return await axios.get(`/challenge/${id}`).then(res => res.data);
};