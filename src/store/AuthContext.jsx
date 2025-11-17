import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { loginUser } from '@/api/AuthApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();  

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('gkmit-user');
      const storedToken = localStorage.getItem('gkmit-token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setAccessToken(storedToken);
      }
    } catch (error) {
      console.error("Failed to parse stored auth data", error);
      localStorage.removeItem('gkmit-user');
      localStorage.removeItem('gkmit-token');
    } finally {
      setIsLoading(false);
    }
  }, []); 

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
    setAccessToken,
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