import React from 'react';
import { useAuth } from '../store/AuthContext.jsx'; 
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/feed" replace />;
  }
  return children;
};