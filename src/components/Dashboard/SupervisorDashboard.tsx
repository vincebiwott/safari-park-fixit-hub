
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import StatsCard from '@/components/Dashboard/StatsCard';
import RecentTickets from '@/components/Dashboard/RecentTickets';
import QuickActions from '@/components/Dashboard/QuickActions';
import { FileText, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const SupervisorDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Supervisor Dashboard - Submit and track your maintenance requests</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="My Open Tickets"
          value={8}
          description="Active requests"
          icon={FileText}
          trend={{ value: 12, isPositive: false }}
        />
        <StatsCard
          title="Pending Review"
          value={3}
          description="Awaiting approval"
          icon={Clock}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Resolved This Month"
          value={24}
          description="Completed tickets"
          icon={CheckCircle}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Average Response Time"
          value="2.4 hrs"
          description="Time to assignment"
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTickets />
        <QuickActions />
      </div>
    </div>
  );
};

export default SupervisorDashboard;
