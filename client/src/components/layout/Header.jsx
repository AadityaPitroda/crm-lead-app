import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import GlobalSearch from '../../search/GlobalSearch.jsx';

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header
            style={{
                display: 'flex',
                padding: '0.75rem 1rem',
                borderBottom: '1px solid #e5e7eb',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <div style={{ fontWeight: 700 }}>Leads CRM</div>
            <div style={{ flex: 1, margin: '0 1rem' }}>
                <GlobalSearch />
            </div>
            <div>
                {user && (
                    <>
                        <span style={{ marginRight: '0.75rem' }}>{user.name}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                )}
            </div>
        </header>
    );
}