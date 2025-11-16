import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/AuthContext.jsx';
import { PublicRoute } from './routes/PublicRoute.jsx';
import { ProtectedRoute } from './routes/ProtectedRoute.jsx';

import { LandingPage } from './pages/LandingPage.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx'; 

// mock feed page
const Feed = () => {
  const { user, logout } = useAuth(); 
  return (
    <div>
      <h1>Welcome {user.name}!</h1>
      <p>Your role is: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* public */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />

          {/* protected */}
          <Route 
            path="/feed" 
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}