import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// FIX: Using relative path
import { useAuth } from '../store/AuthContext.jsx'; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, User, Bookmark, LogOut } from 'lucide-react';

const SidebarNavLink = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink to={to}>
      <Button 
        variant={isActive ? "secondary" : "ghost"} 
        className="w-full justify-start gap-3"
      >
        {icon}
        {children}
      </Button>
    </NavLink>
  );
};

export const LeftSidebar = () => {
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Feed', to: '/feed', icon: <Home className="w-5 h-5" /> },
    { name: 'Profile', to: `/profile/${user?.id}`, icon: <User className="w-5 h-5" /> },
    { name: 'Bookmarks', to: '/bookmarks', icon: <Bookmark className="w-5 h-5" /> },
  ];

  return (
    <Card className="w-full h-full p-4">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <h2 className="text-xl font-bold px-4">GKMIT-INSIDE</h2>
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <SidebarNavLink 
                key={link.name} 
                to={link.to} 
                icon={link.icon}
              >
                {link.name}
              </SidebarNavLink>
            ))}
          </nav>
        </div>

        {/* logout */}
        <div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-500 hover:text-red-700"
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>
    </Card>
  );
};