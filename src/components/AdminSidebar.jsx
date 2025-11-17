import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// Fix: Corrected alias path '@/' to relative path '../'
import { useAuth } from '../store/AuthContext.jsx'; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, FileText, LogOut } from 'lucide-react';

// Reusable NavLink component for the admin sidebar
const AdminNavLink = ({ to, icon, children }) => {
  const location = useLocation();
  // Check if the current path starts with the 'to' link
  const isActive = location.pathname.startsWith(to);

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

export const AdminSidebar = () => {
  const { logout } = useAuth();

  const navLinks = [
    { name: 'Dashboard', to: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'User Management', to: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Post Management', to: '/admin/posts', icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <Card className="w-full h-full sticky top-6 p-4">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <h2 className="text-xl font-bold px-4">Admin Panel</h2>
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <AdminNavLink 
                key={link.name} 
                to={link.to} 
                icon={link.icon}
              >
                {link.name}
              </AdminNavLink>
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