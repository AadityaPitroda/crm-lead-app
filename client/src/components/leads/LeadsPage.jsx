import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLeads } from '../../api/leadsApi.js';
import LeadsTable from './LeadsTable.jsx';
import LeadsFilters from './LeadsFilters.jsx';
import PaginationControls from '../common/PaginationControls.jsx';
import { useDebouncedValue } from '../../hooks/useDebouncedValue.js';

export default function LeadsPage() {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(25);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [status, setStatus] = useState('');
    const [owner, setOwner] = useState('');
    const [search, setSearch] = useState('');

    const debouncedSearch = useDebouncedValue(search, 400);

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['leads', { page, pageSize, sortBy, sortOrder, status, owner, search: debouncedSearch }],
        queryFn: () =>
            fetchLeads({
                page,
                pageSize,
                sortBy,
                sortOrder,
                status,
                owner,
                search: debouncedSearch
            }),
        keepPreviousData: true
    });

    const leads = data?.data || [];
    const pagination = data?.pagination || { total: 0, totalPages: 1 };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleFilterChange = ({ status, owner }) => {
        setStatus(status);
        setOwner(owner);
        setPage(1);
    };

    const handleSearchChange = (value) => {
        setSearch(value);
        setPage(1);
    };

    return (
        <div>
            <h2>Leads Management</h2>
            <LeadsFilters
                status={status}
                owner={owner}
                onChange={handleFilterChange}
                search={search}
                onSearchChange={handleSearchChange}
            />
            <LeadsTable
                leads={leads}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
                loading={isLoading || isFetching}
            />
            <PaginationControls
                page={page}
                totalPages={pagination.totalPages}
                total={pagination.total}
                pageSize={pageSize}
                onPageChange={setPage}
            />
        </div>
    );
}