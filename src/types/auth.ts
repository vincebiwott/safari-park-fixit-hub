
export type UserRole = 'supervisor' | 'technician' | 'hod' | 'super_admin';

export type TechnicianCategory = 'plumber' | 'electrician' | 'ict' | 'carpenter' | 'ac_fridge';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  technicianCategory?: TechnicianCategory;
  department?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  users: User[];
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
  logout: () => void;
}
