
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, AlertTriangle, Calendar } from 'lucide-react';

const AdminQuickActions: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Admin Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm">
            <Users className="h-5 w-5 mx-auto mb-1" />
            Manage Users
          </button>
          <button className="p-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors text-sm">
            <FileText className="h-5 w-5 mx-auto mb-1" />
            View Reports
          </button>
          <button className="p-3 bg-warning text-white rounded-lg hover:bg-warning/90 transition-colors text-sm">
            <AlertTriangle className="h-5 w-5 mx-auto mb-1" />
            System Alerts
          </button>
          <button className="p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
            <Calendar className="h-5 w-5 mx-auto mb-1" />
            Schedules
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminQuickActions;
