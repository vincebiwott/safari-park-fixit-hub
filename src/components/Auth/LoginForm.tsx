
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Login form submitted');
    console.log('📧 Email value:', email);
    console.log('🔑 Password value (length):', password.length);
    
    setIsLoading(true);

    try {
      console.log('⏳ Attempting login...');
      const success = await login(email.trim(), password);
      console.log('📊 Login result:', success);
      
      if (success) {
        console.log('✅ Login successful, showing success toast');
        toast({
          title: 'Login Successful',
          description: 'Welcome to Safari Park Hotel Maintenance System'
        });
      } else {
        console.log('❌ Login failed, showing error toast');
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password. Please check your credentials and try again.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('💥 Login error:', error);
      toast({
        title: 'Error',
        description: 'An error occurred during login',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to fill demo credentials
  const fillDemoCredentials = (demoEmail: string) => {
    console.log('🎭 Filling demo credentials for:', demoEmail);
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">SP</span>
          </div>
          <CardTitle className="text-2xl font-bold">Safari Park Hotel</CardTitle>
          <CardDescription>Maintenance Management System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Demo Accounts (Click to fill):</p>
            <div className="space-y-1 text-xs">
              <button 
                type="button"
                onClick={() => fillDemoCredentials('admin@safaripark.com')}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <span className="font-medium">Admin:</span> admin@safaripark.com
              </button>
              <button 
                type="button"
                onClick={() => fillDemoCredentials('supervisor@safaripark.com')}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <span className="font-medium">Supervisor:</span> supervisor@safaripark.com
              </button>
              <button 
                type="button"
                onClick={() => fillDemoCredentials('electrician@safaripark.com')}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <span className="font-medium">Technician:</span> electrician@safaripark.com
              </button>
              <button 
                type="button"
                onClick={() => fillDemoCredentials('hod@safaripark.com')}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <span className="font-medium">HOD:</span> hod@safaripark.com
              </button>
              <p className="mt-2 font-medium text-center bg-blue-100 p-2 rounded">
                Password: password123 (for all accounts)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
