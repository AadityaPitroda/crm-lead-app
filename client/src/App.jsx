import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Layout from './components/layout/Layout.jsx';
import LeadsPage from './components/leads/LeadsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { setAuthToken } from './api/axiosClient.js';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <LeadsPage />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}