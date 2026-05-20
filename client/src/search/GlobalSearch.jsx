import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '../hooks/useDebouncedValue.js';
import { globalSearchApi } from '../api/searchApi.js';

export default function GlobalSearch() {
    const [search, setSearch] = useState('');
    const debounced = useDebouncedValue(search, 400);

    const { data } = useQuery({
        queryKey: ['globalSearch', debounced],
        queryFn: () => globalSearchApi({ query: debounced, limit: 10 }),
        enabled: debounced.length > 1, // avoid requests for very short queries
        staleTime: 10_000
    });

    const leads = data?.leads || [];

    return (
        <div style={{ position: 'relative' }}>
            <input
                style={{ width: '100%' }}
                placeholder="Global search leads…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {debounced && leads.length > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        top: '2.25rem',
                        left: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: 4,
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        maxHeight: 260,
                        overflowY: 'auto',
                        zIndex: 20
                    }}
                >
                    {leads.map((lead) => (
                        <div
                            key={lead._id}
                            style={{
                                padding: '0.4rem 0.6rem',
                                borderBottom: '1px solid #f3f4f6',
                                fontSize: '0.9rem'
                            }}
                        >
                            <div style={{ fontWeight: 600 }}>{lead.name}</div>
                            <div style={{ color: '#6b7280' }}>{lead.email}</div>
                            <div style={{ color: '#6b7280' }}>
                                {lead.company} • {lead.status} • {lead.owner}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}