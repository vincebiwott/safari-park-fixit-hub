
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SystemActivity: React.FC = () => {
  const activities = [
    { action: 'New user registered', user: 'Jane Smith', time: '5 minutes ago' },
    { action: 'Ticket resolved', user: 'Mike Electrician', time: '15 minutes ago' },
    { action: 'Critical alert triggered', user: 'System', time: '30 minutes ago' },
    { action: 'Report generated', user: 'Sarah HOD', time: '1 hour ago' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent System Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-xs text-gray-600">{activity.user}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemActivity;
