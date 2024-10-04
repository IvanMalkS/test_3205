import axios from 'axios';

const URL = 'http://localhost:4000';

export const useApi = () => {
    return axios.create({
        baseURL: URL,
    });
};