import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/authApi.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('Admin@123');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const result = await loginApi({ email, password });
            login(result);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 360, margin: '3rem auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '0.5rem' }}>
                    <label>Email</label>
                    <input
                        style={{ width: '100%' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                    <label>Password</label>
                    <input
                        style={{ width: '100%' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                </div>
                {error && <div style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in…' : 'Login'}
                </button>
            </form>
        </div>
    );
}