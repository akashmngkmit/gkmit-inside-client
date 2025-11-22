import { api } from '../config/axios.js';

/**
 * Handles the user registration API call.
 * @param {object} userData - The user data from the registration form.
 * @param {string} userData.name
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {string} userData.department
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Registration failed.');
    }
    throw new Error(error.message || 'An unknown error occurred.');
  }
};

/**
 * Handles the user login API call.
 * @param {object} credentials - The user's login credentials.
 * @param {string} credentials.email
 * @param {string} credentials.password
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Login failed.');
    }
    throw new Error(error.message || 'An unknown error occurred.');
  }
};

/**
 * Calls the /refresh endpoint to get a new accessToken.
 * This relies on the httpOnly cookie.
 */
export const refreshAccessToken = async () => {
  try {
    // We send an empty POST request, as per your docs
    const response = await api.post('/auth/refresh', {});
    return response.data; 
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Session expired.');
    }
    throw new Error(error.message || 'An unknown error occurred.');
  }
};
