import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 w-full py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-2xl font-bold text-white">GKMIT-INSIDE</span>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} GKMIT. All rights reserved.
          </p>
        </div>
        <div className="flex flex-row items-center gap-6 md:gap-8 mt-8 md:mt-0">
          <a href="/" className="text-sm hover:text-white transition-colors">
            Home
          </a>
          <a href="/login" className="text-sm hover:text-white transition-colors">
            Login
          </a>
          <a href="/register" className="text-sm hover:text-white transition-colors">
            Register
          </a>
        </div>
      </div>
    </footer>
  );
};