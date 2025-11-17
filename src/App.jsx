import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import { PublicRoute } from './routes/PublicRoute';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { MainAppLayout } from './Layout/MainAppLayout';
import { AdminLayout } from './Layout/AdminLayout';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { FeedPage } from './pages/FeedPage';
import { ProfilePage } from './pages/ProfilePage';
import { BookmarkPage } from './pages/BookmarkPage';
import { AdminDashboardPage } from './pages/AdminDashboard';
import { AdminPostManagementPage } from './pages/AdminPostManagementPage';
import { AdminUserManagementPage } from './pages/AdminUserManagementPage';
import { Toaster } from './components/ui/sonner';


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
            element={
              <ProtectedRoute>
                <MainAppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/bookmarks" element={<BookmarkPage />} />
          </Route>
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="users" element={<AdminUserManagementPage />} />
            <Route path="posts" element={<AdminPostManagementPage />} />
          </Route>
        </Routes>
      </AuthProvider>
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
}