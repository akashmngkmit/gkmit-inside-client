import React from 'react';
// FIX 2: Using consistent relative path
import { useAuth } from '../store/AuthContext.jsx'; 
import { Navigate } from 'react-router-dom';

// FIX 1: Accept an 'allowedRoles' prop
export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!user) {
    // 1. User is not logged in
    return <Navigate to="/login" replace />;
  }

  // 2. NEW: User is logged in, but DO THEY HAVE THE RIGHT ROLE?
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is in the wrong part of the app. Send them to their home.
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/feed" replace />;
    }
  }

  // 3. User is logged in AND has the correct role
  return children;
};