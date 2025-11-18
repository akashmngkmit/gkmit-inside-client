import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner"; 
import { registerUser } from '../api/AuthApi.js'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'email') {
      if (value.includes(' ') || (/[A-Z]/).test(value)) {
        toast.warning("Email must be entirely lowercase and contain no spaces.", { duration: 1500 });
        value = value.toLowerCase().replace(/\s/g, '');
      }
    } else if (name === 'name') {
      value = value.trimStart();
    }
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleDepartmentChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      department: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }
    if (!formData.department) {
      toast.error('Please select a department.');
      return;
    }
    if (formData.email !== formData.email.toLowerCase() || formData.email.includes(' ')) {
        toast.error('Please ensure your email contains only lowercase letters and no spaces.');
        return;
    }
    
    setIsLoading(true);
    const { confirmPassword, ...apiData } = formData;

    try {
      const response = await registerUser(apiData);
      toast.success(response.message || 'Registration successful!');
      navigate('/login');

    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-xl"
      >
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create an Account
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Fill in the details below to register.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              disabled={isLoading}
            />
          </div>
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
              placeholder="you@company.com (lowercase only)"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={formData.department}
              onValueChange={handleDepartmentChange}
              required
              disabled={isLoading}
            >
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="recruitment">Recruitment</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
          
          <div className="text-center text-xs text-gray-500 p-2 bg-gray-50 rounded-md">
            Note: All new accounts are subject to administrator approval.
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};