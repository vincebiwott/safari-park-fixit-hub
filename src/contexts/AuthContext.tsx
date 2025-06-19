
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

const AuthContext = createContext<AuthState | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Supervisor',
    email: 'supervisor@safaripark.com',
    role: 'supervisor',
    department: 'Front Office',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Mike Electrician',
    email: 'electrician@safaripark.com',
    role: 'technician',
    technicianCategory: 'electrician',
    department: 'Maintenance',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Sarah HOD',
    email: 'hod@safaripark.com',
    role: 'hod',
    department: 'Management',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@safaripark.com',
    role: 'super_admin',
    department: 'IT',
    isActive: true,
    createdAt: new Date()
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email && u.isActive);
    
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value: AuthState = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
