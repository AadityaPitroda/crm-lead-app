import React from 'react';

const STATUS_OPTIONS = ['', 'New', 'Contacted', 'Qualified', 'Lost'];
const OWNER_OPTIONS = ['', 'Aaditya', 'John Doe', 'Jane Smith', 'Sales Team'];

export default function LeadsFilters({
    status,
    owner,
    onChange,
    search,
    onSearchChange
}) {
    return (
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <input
                placeholder="Search name, email, company"
                style={{ flex: 1 }}
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <select
                value={status}
                onChange={(e) => onChange({ status: e.target.value, owner })}
            >
                <option value="">All Statuses</option>
                {STATUS_OPTIONS.filter(Boolean).map((s) => (
                    <option key={s} value={s}>
                        {s}
                    </option>
                ))}
            </select>

            <select
                value={owner}
                onChange={(e) => onChange({ status, owner: e.target.value })}
            >
                <option value="">All Owners</option>
                {OWNER_OPTIONS.filter(Boolean).map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </div>
    );
}