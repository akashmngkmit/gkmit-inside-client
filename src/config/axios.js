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