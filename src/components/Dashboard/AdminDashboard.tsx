
import React from 'react';
import StatsCard from '@/components/Dashboard/StatsCard';
import SystemActivity from '@/components/Dashboard/SystemActivity';
import AdminQuickActions from '@/components/Dashboard/AdminQuickActions';
import SystemHealth from '@/components/Dashboard/SystemHealth';
import { Users, FileText, TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
        <p className="text-gray-600">Complete system overview and management controls</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <StatsCard
          title="Total Users"
          value={47}
          description="Active system users"
          icon={Users}
          trend={{ value: 6, isPositive: true }}
        />
        <StatsCard
          title="Total Tickets"
          value={1247}
          description="All time"
          icon={FileText}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="System Uptime"
          value="99.9%"
          description="Last 30 days"
          icon={TrendingUp}
          className="border-l-4 border-l-primary"
        />
        <StatsCard
          title="Avg Resolution"
          value="4.2 hrs"
          description="Time to resolve"
          icon={Clock}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="User Satisfaction"
          value="4.7/5"
          description="Average rating"
          icon={CheckCircle}
          className="border-l-4 border-l-primary"
        />
        <StatsCard
          title="Critical Issues"
          value={2}
          description="Requiring attention"
          icon={AlertTriangle}
          className="border-l-4 border-l-destructive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SystemActivity />
        <AdminQuickActions />
        <SystemHealth />
      </div>
    </div>
  );
};

export default AdminDashboard;
