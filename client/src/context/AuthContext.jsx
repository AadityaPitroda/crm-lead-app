import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('auth');
        if (stored) {
            const parsed = JSON.parse(stored);
            setToken(parsed.token);
            setUser(parsed.user);
        }
    }, []);

    const login = ({ token, user }) => {
        setToken(token);
        setUser(user);
        localStorage.setItem('auth', JSON.stringify({ token, user }));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}