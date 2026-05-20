import api from './axiosClient.js';

export async function globalSearchApi({ query, limit = 10 }) {
    const { data } = await api.get('/search/global', {
        params: { q: query, limit }
    });
    return data;
}