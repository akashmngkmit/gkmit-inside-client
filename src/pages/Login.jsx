import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { useAuth } from '../store/AuthContext.jsx'; // 2. This path is correct

export const Login = () => {
  // Use a single state for form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  // New state for loading
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the login function from your AuthContext
  const { login } = useAuth(); // 3. Get the REFACTORED login function

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // --- REFACTORED Submit handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // 4. Set loading true
    
    try {
      // 5. Call the login function
      await login(formData.email, formData.password);
      // Navigation is now handled inside the AuthContext!
      
    } catch (err) {
      // 6. Handle login failures from the API
      console.error("Login failed:", err);
      // This will show "Invalid credentials" or "Your account is pending..."
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false); // 7. Set loading false
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-xl"
      >
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl text-center font-bold text-gray-900">
            Login
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Welcome back! Please enter your credentials.
          </p> 
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange} 
              placeholder="you@company.com"
              disabled={isLoading} // 8. Disable on load
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password" 
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={isLoading} // 8. Disable on load
            />
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {/* 9. Show loading text */}
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};