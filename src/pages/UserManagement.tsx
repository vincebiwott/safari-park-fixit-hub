
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Shield, Trash2, Edit2, UserPlus } from 'lucide-react';

const UserManagement: React.FC = () => {
  const { profile, profiles, fetchProfiles, updateProfile, deleteProfile } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  useEffect(() => {
    if (profile?.role === 'super_admin') {
      fetchProfiles();
    }
  }, [profile]);

  const filteredProfiles = profiles.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    const success = await updateProfile(userId, { is_active: !currentStatus });
    if (success) {
      toast({
        title: 'User Status Updated',
        description: `User has been ${!currentStatus ? 'activated' : 'deactivated'}`
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      const success = await deleteProfile(userId);
      if (success) {
        toast({
          title: 'User Deleted',
          description: 'User has been permanently removed'
        });
      }
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-destructive';
      case 'hod': return 'bg-secondary';
      case 'supervisor': return 'bg-primary';
      case 'technician': return 'bg-warning';
      default: return 'bg-gray-500';
    }
  };

  // Only allow super_admin to access this page
  if (profile?.role !== 'super_admin') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
            <p className="text-gray-600">Only system administrators can access user management.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage system users and permissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="supervisor">Supervisors</SelectItem>
            <SelectItem value="technician">Technicians</SelectItem>
            <SelectItem value="hod">HODs</SelectItem>
            <SelectItem value="super_admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{profiles.length}</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                <Edit2 className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{profiles.filter(u => u.role === 'technician').length}</p>
                <p className="text-sm text-gray-600">Technicians</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                <UserPlus className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{profiles.filter(u => u.role === 'supervisor').length}</p>
                <p className="text-sm text-gray-600">Supervisors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{profiles.filter(u => u.is_active).length}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>System Users ({filteredProfiles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProfiles.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.department}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                    {user.role.replace('_', ' ').toUpperCase()}
                  </Badge>
                  
                  {user.technician_category && (
                    <Badge variant="outline">
                      {user.technician_category.replace('_', ' ')}
                    </Badge>
                  )}
                  
                  <div className={`text-sm font-medium ${user.is_active ? 'text-primary' : 'text-gray-400'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(user.id, user.is_active)}
                    >
                      {user.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                    
                    {user.id !== profile?.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredProfiles.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No users found matching your search criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
