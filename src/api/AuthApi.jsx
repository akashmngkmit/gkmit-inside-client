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