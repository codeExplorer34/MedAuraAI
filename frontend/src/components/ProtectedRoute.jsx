import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services';
import LoadingScreen from './LoadingScreen';

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
export default function ProtectedRoute({ children }) {
    const isAuthenticated = authService.isAuthenticated();

    // Check authentication
    if (!isAuthenticated) {
        // Redirect to login page
        return <Navigate to="/login" replace />;
    }

    // User is authenticated, render the protected content
    return children;
}
