import axios from 'axios'

export const getAllChallenges = async () => {
    return await axios.get(`/challenge/all`).then(res => res.data);
};

export const getChallenge = async (id) => {
    return await axios.get(`/challenge/${id}`).then(res => res.data);
};

export const sendSolution = async (id, {regexText, regexMode, replaceWith}) => {
    return await axios.post(`/challenge/${id}/solution`, {regex_answer: regexText, regex_mode: regexMode, replace_with: replaceWith}).then(res => res.data);
};