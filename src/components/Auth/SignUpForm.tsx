
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UserRole, TechnicianCategory } from '@/types/auth';
import { Link } from 'react-router-dom';

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole,
    technicianCategory: '' as TechnicianCategory,
    department: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        technicianCategory: formData.role === 'technician' ? formData.technicianCategory : undefined,
        department: formData.department
      });

      if (success) {
        toast({
          title: 'Registration Submitted',
          description: 'Your registration request has been submitted for admin approval. You will receive notification once approved.',
          duration: 5000
        });
      } else {
        toast({
          title: 'Registration Failed',
          description: 'Email already exists or invalid data',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during registration',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">SP</span>
          </div>
          <CardTitle className="text-2xl font-bold">Join Safari Park Hotel</CardTitle>
          <CardDescription>Submit your registration request for approval</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value: UserRole) => setFormData({...formData, role: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="technician">Technician</SelectItem>
                  <SelectItem value="hod">Head of Department</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role === 'technician' && (
              <div className="space-y-2">
                <Label htmlFor="category">Technician Category</Label>
                <Select value={formData.technicianCategory} onValueChange={(value: TechnicianCategory) => setFormData({...formData, technicianCategory: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumber">Plumber</SelectItem>
                    <SelectItem value="electrician">Electrician</SelectItem>
                    <SelectItem value="ict">ICT Specialist</SelectItem>
                    <SelectItem value="carpenter">Carpenter</SelectItem>
                    <SelectItem value="ac_fridge">AC/Refrigeration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                placeholder="Enter your department"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="Confirm your password"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Submitting Request...' : 'Submit Registration Request'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> All registration requests require approval from the system administrator. 
              You will be notified once your account is approved and activated.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
