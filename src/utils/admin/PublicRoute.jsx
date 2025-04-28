import React from "react";
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const { accessToken } = useSelector((state) => state.auth);
    const location = useLocation();

    if (accessToken) {
        // If user is authenticated, redirect to dashboard
        return <Navigate to="/admin/dashboard" state={{ from: location }} replace />;
    }

    // If user is not authenticated, show the login page
    return children;
};

export default PublicRoute;