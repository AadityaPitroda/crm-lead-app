import React from 'react';

const colors = {
    New: '#3b82f6',
    Contacted: '#10b981',
    Qualified: '#8b5cf6',
    Lost: '#ef4444'
};

export default function StatusBadge({ status }) {
    const color = colors[status] || '#6b7280';
    return (
        <span
            style={{
                display: 'inline-block',
                padding: '0.15rem 0.5rem',
                borderRadius: 999,
                backgroundColor: '#f3f4f6',
                color
            }}
        >
            {status}
        </span>
    );
}