import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerUser, loginUser } from '@/api/AuthApi.jsx';
import { api } from '@/config/axios';

vi.mock('../config/axios.js', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('Auth API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  const mockUserData = {
    name: 'Test User',
    email: 'test@gkm.com',
    password: 'password123',
    department: 'Developer'
  };

  describe('registerUser', () => {
    it('should return success message on 201 response', async () => {
      api.post.mockResolvedValueOnce({
        data: {
          success: true,
          message: "User registered successfully. Please wait for admin approval.",
          data: null,
        },
      });

      const result = await registerUser(mockUserData);

      expect(api.post).toHaveBeenCalledWith('/auth/register', mockUserData);
      
      expect(result.success).toBe(true);
      expect(result.message).toContain('wait for admin approval');
    });

    it('should throw an error on 409 Conflict (User exists)', async () => {
      api.post.mockRejectedValueOnce({
        response: {
          data: {
            success: false,
            message: 'User already exists with this email.',
          },
        },
      });

      await expect(registerUser(mockUserData)).rejects.toThrow('User already exists with this email.');
    });
  });
  
  describe('loginUser', () => {
    const mockCredentials = { email: 'user@gkm.com', password: 'password123' };
    const mockToken = "eyJh...[token]...";
    const mockUserResponse = { _id: "60d...", name: "John Doe", role: "employee" };

    it('should return accessToken and user data on 200 OK', async () => {
      api.post.mockResolvedValueOnce({
        data: {
          success: true,
          message: "Login successful",
          data: {
            accessToken: mockToken,
            user: mockUserResponse,
          },
        },
      });

      const result = await loginUser(mockCredentials);
      
      expect(result.data.accessToken).toBe(mockToken);
      expect(result.data.user.role).toBe('employee');
    });

    it('should throw "Invalid credentials" error on 401 Unauthorized', async () => {
      api.post.mockRejectedValueOnce({
        response: {
          data: {
            success: false,
            message: 'Invalid credentials',
          },
          status: 401,
        },
      });

      await expect(loginUser(mockCredentials)).rejects.toThrow('Invalid credentials');
    });
    
    it('should throw "pending admin approval" error on 401 Unauthorized', async () => {
      api.post.mockRejectedValueOnce({
        response: {
          data: {
            success: false,
            message: 'Your account is pending admin approval.',
          },
          status: 401,
        },
      });

      await expect(loginUser(mockCredentials)).rejects.toThrow('Your account is pending admin approval.');
    });
  });
});