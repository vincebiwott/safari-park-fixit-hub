
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DepartmentPerformance: React.FC = () => {
  const departments = [
    { dept: 'Electrical', pending: 8, progress: 5, resolved: 15, score: 92 },
    { dept: 'Plumbing', pending: 6, progress: 3, resolved: 12, score: 88 },
    { dept: 'AC/Fridge', pending: 4, progress: 2, resolved: 8, score: 85 },
    { dept: 'Carpentry', pending: 3, progress: 1, resolved: 6, score: 90 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departments.map((dept, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{dept.dept}</span>
                <span className="text-sm text-primary font-medium">{dept.score}% efficiency</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center">
                  <span className="block text-warning font-medium">{dept.pending}</span>
                  <span className="text-xs text-gray-600">Pending</span>
                </div>
                <div className="text-center">
                  <span className="block text-secondary font-medium">{dept.progress}</span>
                  <span className="text-xs text-gray-600">In Progress</span>
                </div>
                <div className="text-center">
                  <span className="block text-primary font-medium">{dept.resolved}</span>
                  <span className="text-xs text-gray-600">Resolved</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentPerformance;
