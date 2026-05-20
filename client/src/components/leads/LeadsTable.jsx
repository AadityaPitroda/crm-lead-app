import React from 'react';
import StatusBadge from '../common/StatusBadge.jsx';

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'company', label: 'Company' },
    { key: 'status', label: 'Status' },
    { key: 'owner', label: 'Owner' },
    { key: 'createdAt', label: 'Created Date' }
];

export default function LeadsTable({
    leads,
    sortBy,
    sortOrder,
    onSort,
    loading
}) {
    const renderSortIndicator = (key) => {
        if (key !== sortBy) return null;
        return sortOrder === 'asc' ? ' ↑' : ' ↓';
    };

    return (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 4 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f9fafb' }}>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                onClick={() => onSort(col.key)}
                                style={{
                                    padding: '0.5rem',
                                    borderBottom: '1px solid #e5e7eb',
                                    cursor: 'pointer',
                                    textAlign: 'left'
                                }}
                            >
                                {col.label}
                                {renderSortIndicator(col.key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan={columns.length} style={{ padding: '0.75rem' }}>
                                Loading…
                            </td>
                        </tr>
                    )}
                    {!loading && leads.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} style={{ padding: '0.75rem' }}>
                                No leads found.
                            </td>
                        </tr>
                    )}
                    {!loading &&
                        leads.map((lead) => (
                            <tr key={lead._id}>
                                <td style={{ padding: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                                    {lead.name}
                                </td>
                                <td style={{ padding: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                                    {lead.email}
                                </td>
                                <td style={{ padding: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                                    {lead.company}
                                </td>
                                <td style={{ padding: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                                    <StatusBadge status={lead.status} />
                                </td>
                                <td style={{ padding: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                                    {lead.owner}
                                </td>
                                <td style={{ padding: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                                    {new Date(lead.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}