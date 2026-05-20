import React from 'react';

export default function PaginationControls({
    page,
    totalPages,
    total,
    pageSize,
    onPageChange
}) {
    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <div
            style={{
                display: 'flex',
                marginTop: '0.75rem',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <div>
                Page {page} of {totalPages} • {total} results (page size {pageSize})
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => onPageChange(1)} disabled={!canPrev}>
                    « First
                </button>
                <button onClick={() => onPageChange(page - 1)} disabled={!canPrev}>
                    ‹ Prev
                </button>
                <button onClick={() => onPageChange(page + 1)} disabled={!canNext}>
                    Next ›
                </button>
                <button onClick={() => onPageChange(totalPages)} disabled={!canNext}>
                    Last »
                </button>
            </div>
        </div>
    );
}