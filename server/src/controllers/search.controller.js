import { asyncHandler } from '../utils/asyncHandler.js';
import { globalSearch } from '../services/search.service.js';

export const globalSearchController = asyncHandler(async (req, res) => {
    const { q, limit } = req.query;
    const result = await globalSearch({ query: q, limit: Number(limit) || 10 });
    res.json(result);
});