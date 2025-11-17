import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// Fix: We only need loginUser now.
import { loginUser } from '@/api/AuthApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();  

  useEffect(() => {
    try {
      // 1. Check for BOTH user and token in localStorage
      const storedUser = localStorage.getItem('gkmit-user');
      const storedToken = localStorage.getItem('gkmit-token');

      if (storedUser && storedToken) {
        // 2. If they exist, set them into our React state
        setUser(JSON.parse(storedUser));
        setAccessToken(storedToken);
      }
    } catch (error) {
      // If parsing fails, clear storage
      console.error("Failed to parse stored auth data", error);
      localStorage.removeItem('gkmit-user');
      localStorage.removeItem('gkmit-token');
    } finally {
      // 3. We are done checking, stop loading
      setIsLoading(false);
    }
  }, []); // Runs once on app load

  // --- FIX 1 & 2: LOGIN & ADMIN REDIRECT ---
  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    const { user, accessToken } = response.data;
    setUser(user);
    setAccessToken(accessToken);

    localStorage.setItem('gkmit-user', JSON.stringify(user));
    localStorage.setItem('gkmit-token', accessToken);

    toast.success(response.message || 'Login successful!');
    if (user.role === 'employee') {
      navigate('/feed');
    } else {
      navigate('/admin/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('gkmit-user');
    localStorage.removeItem('gkmit-token');
    navigate('/login');
    toast.success('You have been logged out.');
  };

  const value = {
    user,
    accessToken,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};