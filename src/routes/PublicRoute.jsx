import React from 'react';
// FIX 2: Changed alias path to relative path
import { useAuth } from '../store/AuthContext.jsx'; 
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (user) {
    // FIX 1: Make redirect role-aware.
    // This stops overriding the admin redirect from the login page.
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    // Default redirect for any other logged-in user
    return <Navigate to="/feed" replace />;
  }

  // User is not logged in, show the public page (Login, Register, etc.)
  return children;
};