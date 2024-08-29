// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('role');

    if (!authToken || userRole !== role) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
