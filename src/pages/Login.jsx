import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FloatingInput } from '@/components/FloatingInput';
import { ArrowLeft } from 'lucide-react';

import { useAuth } from '../store/AuthContext.jsx'; 

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleGoBack}
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>
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
          <FloatingInput
            id="email"
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange} 
            required
            disabled={isLoading} 
          />
          </div>
          <div className="space-y-2">
          <FloatingInput
            id="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            isPassword
          />
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
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