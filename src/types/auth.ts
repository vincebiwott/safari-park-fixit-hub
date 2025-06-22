
export type UserRole = 'supervisor' | 'technician' | 'hod' | 'super_admin';

export type TechnicianCategory = 'plumber' | 'electrician' | 'ict' | 'carpenter' | 'ac_fridge';

export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  technicianCategory?: TechnicianCategory;
  department?: string;
  isActive: boolean;
  status: UserStatus;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  users: User[];
  pendingUsers: User[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    technicianCategory?: string;
    department: string;
  }) => Promise<boolean>;
  updateUser: (userId: string, updates: Partial<User>) => boolean;
  deleteUser: (userId: string) => boolean;
  approveUser: (userId: string) => boolean;
  rejectUser: (userId: string) => boolean;
  logout: () => void;
}
