
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CriticalAlerts: React.FC = () => {
  const alerts = [
    { 
      title: 'Generator failure - Main building', 
      time: '30 minutes ago', 
      severity: 'critical',
      technician: 'Unassigned'
    },
    { 
      title: 'Water leak - Kitchen area', 
      time: '2 hours ago', 
      severity: 'high',
      technician: 'John Plumber'
    },
    { 
      title: 'Overdue: Room 105 AC repair', 
      time: '1 day overdue', 
      severity: 'overdue',
      technician: 'Mike AC Tech'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Critical Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">{alert.title}</p>
                <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                <p className="text-xs text-gray-500">Assigned to: {alert.technician}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                alert.severity === 'critical' ? 'bg-destructive text-white' :
                alert.severity === 'high' ? 'bg-orange-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CriticalAlerts;
