
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SystemHealth: React.FC = () => {
  const healthItems = [
    { label: 'Database', status: 'Healthy', color: 'primary' },
    { label: 'Email Service', status: 'Active', color: 'primary' },
    { label: 'File Storage', status: '75% Used', color: 'warning' },
    { label: 'API Response', status: 'Fast', color: 'primary' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {healthItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{item.label}</span>
              <span className={`text-sm font-medium ${
                item.color === 'primary' ? 'text-primary' : 'text-warning'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemHealth;
