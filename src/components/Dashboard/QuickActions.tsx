
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock } from 'lucide-react';

const QuickActions: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <FileText className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Submit New Ticket</span>
          </button>
          <button className="p-4 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors">
            <Clock className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">View My Tickets</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
