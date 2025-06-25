
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

  // Simplified profile fetching
  const fetchUserProfile = async (userId: string): Promise<Profile | null> => {
    try {
      console.log('🔍 Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Error fetching profile:', error.message);
        // Don't block auth for profile errors - user can still be authenticated
        return null;
      }

      console.log('✅ Profile fetched successfully:', data?.name);
      return data as Profile;
    } catch (error) {
      console.error('❌ Exception fetching profile:', error);
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

      setProfiles((data || []) as Profile[]);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  // Initialize auth state
  useEffect(() => {
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        console.log('🚀 Initializing auth state...');
        
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Error getting session:', error);
          if (mounted) {
            setIsLoading(false);
          }
          return;
        }

        console.log('📊 Initial session:', session ? `Found for ${session.user?.email}` : 'No session');
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          // Don't block on profile fetch - set loading to false first
          setIsLoading(false);
          
          // Fetch profile in background if user exists
          if (session?.user) {
            console.log('👤 User found, fetching profile in background...');
            fetchUserProfile(session.user.id).then(userProfile => {
              if (mounted) {
                setProfile(userProfile);
                console.log('📋 Profile loaded:', userProfile ? `${userProfile.name} (${userProfile.role})` : 'Profile not found');
              }
            });
          }
        }
      } catch (error) {
        console.error('❌ Error initializing auth:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('🔄 Auth state changed:', event, session ? `Session for ${session.user?.email}` : 'No session');
        
        setSession(session);
        setUser(session?.user ?? null);
        
        // Always set loading to false on auth state change
        setIsLoading(false);
        
        if (session?.user && event !== 'SIGNED_OUT') {
          console.log('👤 User authenticated, fetching profile in background...');
          // Fetch profile in background
          setTimeout(() => {
            fetchUserProfile(session.user.id).then(userProfile => {
              if (mounted) {
                setProfile(userProfile);
                console.log('📋 Profile loaded:', userProfile ? `${userProfile.name} (${userProfile.role})` : 'Profile not found');
              }
            });
          }, 0);
        } else {
          console.log('👋 User logged out or no user');
          if (mounted) {
            setProfile(null);
          }
        }
      }
    );

    // Initialize auth
    initializeAuth();

    // Failsafe timeout - ensure loading doesn't get stuck
    const timeoutId = setTimeout(() => {
      if (mounted && isLoading) {
        console.log('⏰ Auth initialization timeout, setting loading to false');
        setIsLoading(false);
      }
    }, 5000);

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Attempting login for:', email);
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        console.error('❌ Login error:', error);
        toast({
          title: 'Login Failed',
          description: error.message,
          variant: 'destructive'
        });
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        console.log('✅ Login successful for:', data.user.email);
        toast({
          title: 'Login Successful',
          description: 'Welcome back!'
        });
        // Don't set loading to false here - let auth state change handle it
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('❌ Login error:', error);
      toast({
        title: 'Login Failed',
        description: 'An error occurred during login',
        variant: 'destructive'
      });
      setIsLoading(false);
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
      console.log('📝 Attempting signup for:', userData.email);
      
      // Check if this is the first user - if so, make them super_admin
      const { data: existingProfiles } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      const isFirstUser = !existingProfiles || existingProfiles.length === 0;
      const finalRole = isFirstUser ? 'super_admin' : userData.role;
      
      console.log('👑 First user check:', isFirstUser, 'Final role:', finalRole);

      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            name: userData.name,
            role: finalRole,
            technician_category: userData.technicianCategory,
            department: userData.department
          }
        }
      });

      if (error) {
        console.error('❌ Sign up error:', error);
        toast({
          title: 'Sign Up Failed',
          description: error.message,
          variant: 'destructive'
        });
        return false;
      }

      if (data.user) {
        console.log('✅ Signup successful for:', data.user.email);
        console.log('📧 Email confirmed:', data.user.email_confirmed_at ? 'Yes' : 'No');
        
        toast({
          title: 'Sign Up Successful',
          description: isFirstUser 
            ? 'Welcome! You have been granted admin access. You can now log in.'
            : data.user.email_confirmed_at 
              ? 'Account created successfully! You can now log in.'
              : 'Please check your email to confirm your account before logging in.',
          duration: 7000
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('❌ Sign up error:', error);
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
      console.log('👋 Logging out...');
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
    isAuthenticated: !!user, // Simplified - don't require profile for auth
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
