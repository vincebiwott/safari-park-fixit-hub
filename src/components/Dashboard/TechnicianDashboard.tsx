
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import StatsCard from '@/components/Dashboard/StatsCard';
import AvailableTasks from '@/components/Dashboard/AvailableTasks';
import TodaySchedule from '@/components/Dashboard/TodaySchedule';
import { FileText, Wrench, CheckCircle, TrendingUp } from 'lucide-react';

const TechnicianDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Technician Dashboard - {user?.technicianCategory} specialist</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Available Tasks"
          value={5}
          description="Ready to accept"
          icon={FileText}
          className="border-l-4 border-l-warning"
        />
        <StatsCard
          title="My Active Tasks"
          value={3}
          description="In progress"
          icon={Wrench}
          className="border-l-4 border-l-secondary"
        />
        <StatsCard
          title="Completed Today"
          value={2}
          description="Tasks finished"
          icon={CheckCircle}
          className="border-l-4 border-l-primary"
        />
        <StatsCard
          title="Response Score"
          value="4.8/5"
          description="Performance rating"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AvailableTasks />
        <TodaySchedule />
      </div>
    </div>
  );
};

export default TechnicianDashboard;
