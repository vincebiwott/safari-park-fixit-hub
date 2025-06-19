
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TodaySchedule: React.FC = () => {
  const scheduleItems = [
    { title: 'Room 205 - AC Repair', time: '10:00 AM', status: 'primary' },
    { title: 'Lobby - Outlet Check', time: '2:00 PM', status: 'secondary' },
    { title: 'Conference Room - Lighting', time: '4:00 PM', status: 'gray' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {scheduleItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                item.status === 'primary' ? 'bg-primary' :
                item.status === 'secondary' ? 'bg-secondary' :
                'bg-gray-300'
              }`}></div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-600">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaySchedule;
