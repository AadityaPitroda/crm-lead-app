import React from 'react';
import Header from './Header.jsx';

export default function Layout({ children }) {
    return (
        <div className="app">
            <Header />
            <main style={{ padding: '1rem' }}>{children}</main>
        </div>
    );
}