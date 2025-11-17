import axios from 'axios';

// This is our PUBLIC axios instance, used for unauthenticated
// routes like login and register.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // We add this for the /refresh endpoint to work.
  // It tells axios to send cookies (like our httpOnly refreshToken)
  // with the request.
  withCredentials: true, 
});

api.interceptors.request.use(
  config => {
    // FIX: Read the token from the key we will set in AuthContext
    const token = localStorage.getItem('gkmit-token');
    
    if (token) {
      if (!config.headers) config.headers = {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);