import { asyncHandler } from '../utils/asyncHandler.js';
import { getLeads } from '../services/leads.service.js';

export const getLeadsController = asyncHandler(async (req, res) => {
    const {
        page,
        pageSize,
        sortBy,
        sortOrder,
        status,
        owner,
        search
    } = req.query;

    const result = await getLeads({
        page,
        pageSize,
        sortBy,
        sortOrder,
        status,
        owner,
        search
    });

    res.json(result);
});