
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import MainLayout from "./components/Layout/MainLayout";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
        <span className="text-white font-bold text-sm">SP</span>
      </div>
      <p className="text-gray-600">Loading Safari Park Hotel System...</p>
      <div className="mt-4 text-xs text-gray-500">
        Initializing authentication...
      </div>
    </div>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading, user, profile } = useAuth();
  
  console.log('🛡️ ProtectedRoute check:', { isAuthenticated, isLoading, hasUser: !!user, hasProfile: !!profile });
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    console.log('🚫 Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('✅ Authenticated, rendering protected content');
  return <>{children}</>;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, isAuthenticated, isLoading } = useAuth();
  
  console.log('👑 AdminRoute check:', { role: profile?.role, isAuthenticated, isLoading });
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (profile?.role !== 'super_admin') {
    console.log('🚫 Not admin, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  console.log('✅ Admin access granted');
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('🗺️ AppRoutes render:', { isAuthenticated, isLoading });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!isAuthenticated ? <LoginForm /> : <Navigate to="/dashboard" replace />} 
      />
      <Route 
        path="/signup" 
        element={!isAuthenticated ? <SignUpForm /> : <Navigate to="/dashboard" replace />} 
      />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <AdminRoute>
          <UserManagement />
        </AdminRoute>
      } />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
