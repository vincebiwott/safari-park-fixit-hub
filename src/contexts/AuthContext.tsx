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
  const [users, setUsers] = useState<User[]>([]);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);

  useEffect(() => {
    console.log('🔧 AuthProvider initialization starting...');
    
    // Clear any potentially corrupted data first
    const resetLocalStorage = () => {
      console.log('🗑️ Resetting localStorage to ensure fresh state');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('systemUsers');
      localStorage.removeItem('pendingUsers');
    };

    // Initialize with fresh mock data
    const initializeUsers = () => {
      console.log('📝 Initializing with fresh mock users:', mockUsers.length, 'users');
      setUsers(mockUsers);
      localStorage.setItem('systemUsers', JSON.stringify(mockUsers));
      console.log('✅ Users initialized successfully');
    };

    // Check if we need to reset
    try {
      const savedUsers = localStorage.getItem('systemUsers');
      if (!savedUsers) {
        console.log('❌ No saved users found, initializing fresh data');
        resetLocalStorage();
        initializeUsers();
      } else {
        const parsedUsers = JSON.parse(savedUsers);
        console.log('📂 Found saved users:', parsedUsers.length, 'users');
        
        // Verify the admin user exists
        const adminExists = parsedUsers.find((u: User) => u.email === 'admin@safaripark.com');
        if (!adminExists) {
          console.log('⚠️ Admin user missing, resetting data');
          resetLocalStorage();
          initializeUsers();
        } else {
          console.log('✅ Admin user found, using saved data');
          setUsers(parsedUsers);
        }
      }
    } catch (error) {
      console.error('💥 Error parsing saved users, resetting:', error);
      resetLocalStorage();
      initializeUsers();
    }

    // Handle pending users
    try {
      const savedPendingUsers = localStorage.getItem('pendingUsers');
      if (savedPendingUsers) {
        const parsedPendingUsers = JSON.parse(savedPendingUsers);
        console.log('📂 Found pending users:', parsedPendingUsers.length, 'users');
        setPendingUsers(parsedPendingUsers);
      }
    } catch (error) {
      console.error('💥 Error parsing pending users:', error);
      localStorage.removeItem('pendingUsers');
    }

    // Handle current user
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        console.log('👤 Found current user:', parsedUser.email);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('💥 Error parsing current user:', error);
      localStorage.removeItem('currentUser');
    }

    console.log('✅ AuthProvider initialization complete');
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('🔐 Login attempt starting...');
    console.log('📧 Email:', email);
    console.log('🔑 Password length:', password.length);
    console.log('👥 Available users:', users.length);
    
    // Log all available users for debugging
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`, {
        email: user.email,
        isActive: user.isActive,
        status: user.status,
        name: user.name
      });
    });

    const foundUser = users.find(u => {
      const emailMatch = u.email.toLowerCase() === email.toLowerCase();
      console.log(`🔍 Checking user ${u.email}:`, {
        emailMatch,
        isActive: u.isActive,
        status: u.status
      });
      return emailMatch && u.isActive && u.status === 'active';
    });
    
    if (!foundUser) {
      console.log('❌ No matching user found');
      console.log('📊 Search criteria: email =', email, 'isActive = true, status = active');
      return false;
    }

    console.log('✅ User found:', foundUser.name, foundUser.email);
    console.log('🔑 Checking password...');
    
    if (password === 'password123') {
      console.log('✅ Password correct, logging in user');
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      console.log('🎉 Login successful!');
      return true;
    } else {
      console.log('❌ Password incorrect. Expected: password123, Got:', password);
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
