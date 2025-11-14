import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // To link back to login

export const Register = () => {
  // State for all form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('Employee'); // Default role
  const [error, setError] = useState(null); // For showing errors

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // --- Validation ---
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    // Simple password strength check (example)
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    // --- API Call ---
    // This is where you'll send the data to your backend
    console.log('Registration Submitted:', { 
      name, 
      email, 
      password, 
      department,
      roleId: role // Your schema shows 'roleId'
    });
    
    // On successful API call:
    // 1. You would redirect to a "Pending Approval" page
    //    or back to the login page with a success message.
    // e.g., navigate('/login?status=pending');
    
    // On API error (e.g., email already exists):
    // setError('This email is already registered.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-xl">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create an Account
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Fill in the details below to register.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
              placeholder="John Doe"
            />
          </div>

          {/* Email Address */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
              placeholder="you@company.com"
            />
          </div>

          {/* Department & Role (Side-by-side on larger screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Department (as per your schema) */}
            <div>
              <label 
                htmlFor="department" 
                className="block text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <select
                id="department"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
              >
                <option value="" disabled>Select department</option>
                <option value="hr">HR</option>
                <option value="recruitment">Recruitment</option>
                <option value="developer">Developer</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            {/* Role (as per your schema) */}
            <div>
              <label 
                htmlFor="role" 
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
              >
                {/* Assuming 'Employee' and 'Admin' are the roles */}
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
              placeholder="Minimum 8 characters"
            />
          </div>
          
          {/* Confirm Password */}
          <div>
            <label 
              htmlFor="confirm-password" 
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
              placeholder="••••••••"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center text-sm text-red-600">
              {error}
            </div>
          )}
          
          {/* Approval Note (From your DFD) */}
          <div className="text-center text-xs text-gray-500 p-2 bg-gray-50 rounded-md">
            Note: All new accounts are subject to administrator approval. You
            will be able to log in once your account has been approved.
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-200"
            >
              Register
            </button>
          </div>
        </div>

        {/* Footer Link to Login */}
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