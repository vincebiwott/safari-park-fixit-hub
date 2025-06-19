
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import StatsCard from '@/components/Dashboard/StatsCard';
import DepartmentPerformance from '@/components/Dashboard/DepartmentPerformance';
import CriticalAlerts from '@/components/Dashboard/CriticalAlerts';
import { FileText, AlertTriangle, Wrench, CheckCircle, Users } from 'lucide-react';

const HODDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Head of Department Dashboard - System Overview</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Total Active Tickets"
          value={45}
          description="All open requests"
          icon={FileText}
          trend={{ value: 8, isPositive: false }}
        />
        <StatsCard
          title="Critical Issues"
          value={3}
          description="Require immediate attention"
          icon={AlertTriangle}
          className="border-l-4 border-l-destructive"
        />
        <StatsCard
          title="In Progress"
          value={28}
          description="Being worked on"
          icon={Wrench}
          className="border-l-4 border-l-secondary"
        />
        <StatsCard
          title="Resolved Today"
          value={12}
          description="Completed tickets"
          icon={CheckCircle}
          className="border-l-4 border-l-primary"
        />
        <StatsCard
          title="Active Technicians"
          value={8}
          description="Currently working"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentPerformance />
        <CriticalAlerts />
      </div>
    </div>
  );
};

export default HODDashboard;
