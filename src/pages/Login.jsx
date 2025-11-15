import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div>
            <Button type="submit" className="w-full">
              Login
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