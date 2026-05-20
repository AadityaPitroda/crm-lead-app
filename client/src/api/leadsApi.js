import api from './axiosClient.js';

export async function fetchLeads({
    page,
    pageSize,
    sortBy,
    sortOrder,
    status,
    owner,
    search
}) {
    const params = {
        page,
        pageSize,
        sortBy,
        sortOrder
    };
    if (status) params.status = status;
    if (owner) params.owner = owner;
    if (search) params.search = search;

    const { data } = await api.get('/leads', { params });
    return data;
}