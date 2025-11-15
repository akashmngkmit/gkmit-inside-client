import React from 'react';
import { useAuth } from '@/store/AuthContext';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return null;
  }

  if (user) {
    return <Navigate to="/feed" replace />;
  }

  return children;
};