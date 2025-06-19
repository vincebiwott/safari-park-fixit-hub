
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import SupervisorDashboard from '@/components/Dashboard/SupervisorDashboard';
import TechnicianDashboard from '@/components/Dashboard/TechnicianDashboard';
import HODDashboard from '@/components/Dashboard/HODDashboard';
import AdminDashboard from '@/components/Dashboard/AdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'supervisor':
      return <SupervisorDashboard />;
    case 'technician':
      return <TechnicianDashboard />;
    case 'hod':
      return <HODDashboard />;
    case 'super_admin':
      return <AdminDashboard />;
    default:
      return <div>Loading...</div>;
  }
};

export default Dashboard;
