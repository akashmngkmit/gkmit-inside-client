import React from 'react'
import { useState } from 'react';
import logo from '../assets/images/gkmit_inside_logo.png'


export const Navbar = () => {
    const [activeTab, setActiveTab] = useState('home');
  return (
    <nav className='flex items-center justify-around w-full h-20 bg-white shadow-2xs backdrop:backdrop-blur-2xl z-10'>
        <img 
            src={logo} 
            alt="GKMIT Inside Logo" 
            className='w-32 h-w-32 object-contain grayscale'
        />
        <div className='bg-black h-12 p-4 w-48 text-white flex gap-8 items-center justify-center rounded-full'>
            <a 
                href="/" 
                onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}
                className={`transition-opacity ${activeTab === 'home' ? 'opacity-100 font-semibold' : 'opacity-60 hover:opacity-100'}`}>
            Home
            </a>
            <a 
                href="/login"
                onClick={(e) => { e.preventDefault(); setActiveTab('login'); }}
                className={`transition-opacity ${activeTab === 'login' ? 'opacity-100 font-semibold' : 'opacity-60 hover:opacity-100'}`}>
            Login
            </a>
      </div>
        </nav>
  )
}

