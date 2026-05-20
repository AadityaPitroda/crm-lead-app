import api from './axiosClient.js';

export async function loginApi({ email, password }) {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
}