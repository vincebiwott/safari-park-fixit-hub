
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, UserStatus } from '../types/auth';

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
    status: 'active',
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
    status: 'active',
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Sarah HOD',
    email: 'hod@safaripark.com',
    role: 'hod',
    department: 'Management',
    isActive: true,
    status: 'active',
    createdAt: new Date()
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@safaripark.com',
    role: 'super_admin',
    department: 'IT',
    isActive: true,
    status: 'active',
    createdAt: new Date()
  },
  {
    id: '5',
    name: 'James Plumber',
    email: 'plumber@safaripark.com',
    role: 'technician',
    technicianCategory: 'plumber',
    department: 'Maintenance',
    isActive: true,
    status: 'active',
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
    status: 'active',
    createdAt: new Date()
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedUsers = localStorage.getItem('systemUsers');
    const savedPendingUsers = localStorage.getItem('pendingUsers');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      localStorage.setItem('systemUsers', JSON.stringify(mockUsers));
    }

    if (savedPendingUsers) {
      setPendingUsers(JSON.parse(savedPendingUsers));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find(u => u.email === email && u.isActive && u.status === 'active');
    
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
    // Check if user already exists in active users or pending users
    const existingUser = users.find(u => u.email === userData.email);
    const existingPendingUser = pendingUsers.find(u => u.email === userData.email);
    
    if (existingUser || existingPendingUser) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role as any,
      technicianCategory: userData.technicianCategory as any,
      department: userData.department,
      isActive: false,
      status: 'pending',
      createdAt: new Date()
    };

    const updatedPendingUsers = [...pendingUsers, newUser];
    setPendingUsers(updatedPendingUsers);
    localStorage.setItem('pendingUsers', JSON.stringify(updatedPendingUsers));
    
    return true;
  };

  const approveUser = (userId: string): boolean => {
    const userToApprove = pendingUsers.find(u => u.id === userId);
    if (!userToApprove) return false;

    const approvedUser: User = {
      ...userToApprove,
      isActive: true,
      status: 'active'
    };

    const updatedUsers = [...users, approvedUser];
    const updatedPendingUsers = pendingUsers.filter(u => u.id !== userId);

    setUsers(updatedUsers);
    setPendingUsers(updatedPendingUsers);
    
    localStorage.setItem('systemUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('pendingUsers', JSON.stringify(updatedPendingUsers));

    return true;
  };

  const rejectUser = (userId: string): boolean => {
    const updatedPendingUsers = pendingUsers.filter(u => u.id !== userId);
    setPendingUsers(updatedPendingUsers);
    localStorage.setItem('pendingUsers', JSON.stringify(updatedPendingUsers));
    return true;
  };

  const updateUser = (userId: string, updates: Partial<User>): boolean => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, ...updates } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('systemUsers', JSON.stringify(updatedUsers));

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
    pendingUsers,
    isAuthenticated: !!user,
    login,
    register,
    updateUser,
    deleteUser,
    approveUser,
    rejectUser,
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
