import { Lead } from '../models/Lead.js';

export async function globalSearch({ query, limit = 10 }) {
    if (!query || !query.trim()) return { leads: [] };

    const leads = await Lead.aggregate([
        { $match: { $text: { $search: query } } },
        { $addFields: { score: { $meta: 'textScore' } } },
        { $sort: { score: -1 } },
        { $limit: limit },
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                company: 1,
                status: 1,
                owner: 1,
                createdAt: 1,
                score: 1
            }
        }
    ]);

    return { leads };
}