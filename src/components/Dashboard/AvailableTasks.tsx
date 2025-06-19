
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AvailableTasks: React.FC = () => {
  const tasks = [
    { title: 'Electrical outlet repair - Room 305', urgency: 'high', time: '2 hours ago' },
    { title: 'Light fixture replacement - Lobby', urgency: 'medium', time: '4 hours ago' },
    { title: 'Wiring check - Conference Room B', urgency: 'low', time: '6 hours ago' }
  ];

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>New Tasks Available</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">{task.title}</p>
                <p className="text-xs text-gray-600">{task.time}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.urgency === 'high' ? 'bg-destructive text-white' :
                  task.urgency === 'medium' ? 'bg-warning text-white' :
                  'bg-primary text-white'
                }`}>
                  {task.urgency}
                </span>
                <button className="px-3 py-1 bg-primary text-white rounded text-xs hover:bg-primary/90">
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailableTasks;
