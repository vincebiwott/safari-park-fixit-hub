
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { User, UserRole } from '@/types/auth';
import { Edit2, Trash2, UserPlus, Shield, ShieldCheck, Clock, CheckCircle, XCircle } from 'lucide-react';

const UserManagement: React.FC = () => {
  const { users, pendingUsers, updateUser, deleteUser, approveUser, rejectUser, user: currentUser } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'active' | 'pending'>('active');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const filteredPendingUsers = pendingUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleToggleStatus = (userId: string, currentStatus: boolean) => {
    updateUser(userId, { isActive: !currentStatus });
    toast({
      title: 'User Status Updated',
      description: `User has been ${!currentStatus ? 'activated' : 'deactivated'}`
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
      toast({
        title: 'User Deleted',
        description: 'User has been permanently removed'
      });
    }
  };

  const handleApproveUser = (userId: string) => {
    if (approveUser(userId)) {
      toast({
        title: 'User Approved',
        description: 'User registration has been approved and activated'
      });
    }
  };

  const handleRejectUser = (userId: string) => {
    if (window.confirm('Are you sure you want to reject this registration?')) {
      if (rejectUser(userId)) {
        toast({
          title: 'User Rejected',
          description: 'User registration has been rejected'
        });
      }
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'bg-destructive';
      case 'hod': return 'bg-secondary';
      case 'supervisor': return 'bg-primary';
      case 'technician': return 'bg-warning';
      default: return 'bg-gray-500';
    }
  };

  // Only allow super_admin to access this page
  if (currentUser?.role !== 'super_admin') {
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
          <p className="text-gray-600">Manage system users and approve registrations</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'active' 
              ? 'bg-white shadow-sm text-gray-900' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Active Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
            activeTab === 'pending' 
              ? 'bg-white shadow-sm text-gray-900' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Pending Approvals ({pendingUsers.length})
          {pendingUsers.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {pendingUsers.length}
            </span>
          )}
        </button>
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
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingUsers.length}</p>
                <p className="text-sm text-gray-600">Pending Approval</p>
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
                <p className="text-2xl font-bold">{users.filter(u => u.role === 'technician').length}</p>
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
                <p className="text-2xl font-bold">{users.filter(u => u.role === 'supervisor').length}</p>
                <p className="text-sm text-gray-600">Supervisors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {activeTab === 'active' 
              ? `Active Users (${filteredUsers.length})` 
              : `Pending Approvals (${filteredPendingUsers.length})`
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeTab === 'active' && filteredUsers.map((user) => (
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
                  
                  {user.technicianCategory && (
                    <Badge variant="outline">
                      {user.technicianCategory.replace('_', ' ')}
                    </Badge>
                  )}
                  
                  <div className={`text-sm font-medium ${user.isActive ? 'text-primary' : 'text-gray-400'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(user.id, user.isActive)}
                    >
                      {user.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    
                    {user.id !== currentUser?.id && (
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

            {activeTab === 'pending' && filteredPendingUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border-2 border-amber-200 bg-amber-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-amber-700" />
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
                  
                  {user.technicianCategory && (
                    <Badge variant="outline">
                      {user.technicianCategory.replace('_', ' ')}
                    </Badge>
                  )}
                  
                  <Badge variant="outline" className="text-amber-700 border-amber-300">
                    Pending
                  </Badge>

                  <div className="flex space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleApproveUser(user.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRejectUser(user.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {activeTab === 'active' && filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No active users found matching your search criteria.
              </div>
            )}

            {activeTab === 'pending' && filteredPendingUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No pending registrations at this time.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
