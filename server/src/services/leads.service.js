import { Lead } from '../models/Lead.js';

const ALLOWED_SORT_FIELDS = ['name', 'email', 'company', 'status', 'owner', 'createdAt'];

export async function getLeads({
    page = 1,
    pageSize = 20,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    status,
    owner,
    search
}) {
    const pageNum = Math.max(1, Number(page));
    const limit = Math.min(100, Math.max(1, Number(pageSize)));
    const sortField = ALLOWED_SORT_FIELDS.includes(sortBy) ? sortBy : 'createdAt';
    const sortDir = sortOrder === 'asc' ? 1 : -1;

    const match = {};

    if (status) match.status = status;
    if (owner) match.owner = owner;

    // Text search across name, email, company (using text index)
    if (search) {
        match.$text = { $search: search };
    }

    const pipeline = [
        { $match: match },
        {
            $facet: {
                metadata: [{ $count: 'total' }],
                data: [
                    // For text search, you can also sort by textScore first if desired
                    { $sort: { [sortField]: sortDir, _id: 1 } },
                    { $skip: (pageNum - 1) * limit },
                    { $limit: limit }
                ]
            }
        }
    ];

    const [result] = await Lead.aggregate(pipeline).allowDiskUse(true); // allowDiskUse for large sets[web:16]

    const total = result?.metadata?.[0]?.total || 0;
    const data = result?.data || [];
    const totalPages = Math.ceil(total / limit) || 1;

    return {
        data,
        pagination: {
            page: pageNum,
            pageSize: limit,
            total,
            totalPages
        }
    };
}