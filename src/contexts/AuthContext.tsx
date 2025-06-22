
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

const AuthContext = createContext<AuthState | undefined>(undefined);

// Enhanced mock users for demonstration
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
  },
  // Additional demo users for presentation
  {
    id: '5',
    name: 'James Plumber',
    email: 'plumber@safaripark.com',
    role: 'technician',
    technicianCategory: 'plumber',
    department: 'Maintenance',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '6',
    name: 'Lisa Carpenter',
    email: 'carpenter@safaripark.com',
    role: 'technician',
    technicianCategory: 'carpenter',
    department: 'Maintenance',
    isActive: true,
    createdAt: new Date()
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedUsers = localStorage.getItem('systemUsers');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      localStorage.setItem('systemUsers', JSON.stringify(mockUsers));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find(u => u.email === email && u.isActive);
    
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    technicianCategory?: string;
    department: string;
  }): Promise<boolean> => {
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role as any,
      technicianCategory: userData.technicianCategory as any,
      department: userData.department,
      isActive: true,
      createdAt: new Date()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('systemUsers', JSON.stringify(updatedUsers));
    
    // Auto-login after registration
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return true;
  };

  const updateUser = (userId: string, updates: Partial<User>): boolean => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, ...updates } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('systemUsers', JSON.stringify(updatedUsers));

    // Update current user if it's the one being updated
    if (user && user.id === userId) {
      const updatedCurrentUser = { ...user, ...updates };
      setUser(updatedCurrentUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    }

    return true;
  };

  const deleteUser = (userId: string): boolean => {
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('systemUsers', JSON.stringify(updatedUsers));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value: AuthState = {
    user,
    users,
    isAuthenticated: !!user,
    login,
    register,
    updateUser,
    deleteUser,
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
