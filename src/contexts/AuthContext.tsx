
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  name: string;
  email: string;
  role: 'supervisor' | 'technician' | 'hod' | 'super_admin';
  technician_category?: 'plumber' | 'electrician' | 'ict' | 'carpenter' | 'ac_fridge';
  department: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  profiles: Profile[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    technicianCategory?: string;
    department: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchProfiles: () => Promise<void>;
  updateProfile: (id: string, updates: Partial<Profile>) => Promise<boolean>;
  deleteProfile: (id: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Fetch all profiles (for admin use)
  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching profiles:', error);
        return;
      }

      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  // Initialize auth state
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id).then(setProfile);
      }
      
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const userProfile = await fetchUserProfile(session.user.id);
          setProfile(userProfile);
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        console.error('Login error:', error);
        toast({
          title: 'Login Failed',
          description: error.message,
          variant: 'destructive'
        });
        return false;
      }

      if (data.user) {
        toast({
          title: 'Login Successful',
          description: 'Welcome to Safari Park Hotel Maintenance System'
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login Failed',
        description: 'An error occurred during login',
        variant: 'destructive'
      });
      return false;
    }
  };

  const signUp = async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    technicianCategory?: string;
    department: string;
  }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: userData.name,
            role: userData.role,
            technician_category: userData.technicianCategory,
            department: userData.department
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        toast({
          title: 'Sign Up Failed',
          description: error.message,
          variant: 'destructive'
        });
        return false;
      }

      if (data.user) {
        toast({
          title: 'Sign Up Successful',
          description: 'Please check your email to confirm your account.',
          duration: 5000
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: 'Sign Up Failed',
        description: 'An error occurred during sign up',
        variant: 'destructive'
      });
      return false;
    }
  };

  const updateProfile = async (id: string, updates: Partial<Profile>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: 'Update Failed',
          description: error.message,
          variant: 'destructive'
        });
        return false;
      }

      // Refresh profiles
      await fetchProfiles();
      
      // Update current profile if it's the same user
      if (profile && profile.id === id) {
        const updatedProfile = await fetchUserProfile(id);
        setProfile(updatedProfile);
      }

      toast({
        title: 'Profile Updated',
        description: 'Profile has been successfully updated'
      });
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };

  const deleteProfile = async (id: string): Promise<boolean> => {
    try {
      // Delete from auth.users will cascade to profiles
      const { error } = await supabase.auth.admin.deleteUser(id);

      if (error) {
        console.error('Error deleting profile:', error);
        toast({
          title: 'Delete Failed',
          description: error.message,
          variant: 'destructive'
        });
        return false;
      }

      // Refresh profiles
      await fetchProfiles();
      
      toast({
        title: 'Profile Deleted',
        description: 'Profile has been successfully deleted'
      });
      return true;
    } catch (error) {
      console.error('Error deleting profile:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      
      // Clear local state
      setUser(null);
      setProfile(null);
      setSession(null);
      setProfiles([]);
      
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthState = {
    user,
    profile,
    session,
    profiles,
    isAuthenticated: !!user && !!profile,
    isLoading,
    login,
    signUp,
    logout,
    fetchProfiles,
    updateProfile,
    deleteProfile
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
