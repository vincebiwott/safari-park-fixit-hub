
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

const AuthContext = createContext<AuthState | undefined>(undefined);

// Fresh mock users with proper status values
const DEMO_USERS: User[] = [
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
  const [users, setUsers] = useState<User[]>([]);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);

  useEffect(() => {
    console.log('🔄 Initializing fresh authentication system...');
    
    // Force fresh initialization
    console.log('🗑️ Clearing old data...');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('systemUsers');
    localStorage.removeItem('pendingUsers');
    
    // Set fresh demo users
    console.log('✨ Setting up fresh demo users...');
    setUsers(DEMO_USERS);
    localStorage.setItem('systemUsers', JSON.stringify(DEMO_USERS));
    
    // Verify the data is correct
    DEMO_USERS.forEach((user, index) => {
      console.log(`✅ Demo User ${index + 1}:`, {
        email: user.email,
        status: user.status,
        isActive: user.isActive,
        name: user.name
      });
    });
    
    console.log('🎉 Authentication system initialized successfully!');
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('🔐 Starting login process...');
    console.log('📧 Login email:', email);
    console.log('🔑 Password length:', password.length);
    console.log('👥 Available users count:', users.length);
    
    // Find matching user
    const foundUser = users.find(u => {
      const emailMatch = u.email.toLowerCase() === email.toLowerCase();
      const isActiveUser = u.isActive === true;
      const hasActiveStatus = u.status === 'active';
      
      console.log(`🔍 Checking ${u.email}:`, {
        emailMatch,
        isActiveUser,
        hasActiveStatus,
        userStatus: u.status,
        userIsActive: u.isActive
      });
      
      return emailMatch && isActiveUser && hasActiveStatus;
    });
    
    if (!foundUser) {
      console.log('❌ No matching user found');
      return false;
    }

    console.log('✅ User found:', foundUser.name);
    
    // Check password
    if (password === 'password123') {
      console.log('✅ Password correct - logging in');
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    } else {
      console.log('❌ Password incorrect');
      return false;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    technicianCategory?: string;
    department: string;
  }): Promise<boolean> => {
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
    console.log('🚪 Logging out user');
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
