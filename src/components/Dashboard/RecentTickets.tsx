
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecentTickets: React.FC = () => {
  const tickets = [
    { title: 'AC not working - Room 201', status: 'in_progress', urgency: 'high' },
    { title: 'Leaky faucet - Bathroom 105', status: 'pending', urgency: 'medium' },
    { title: 'Electrical outlet issue - Conference Room', status: 'resolved', urgency: 'low' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tickets.map((ticket, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">{ticket.title}</p>
                <p className="text-xs text-gray-600 capitalize">{ticket.urgency} priority</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                ticket.status === 'resolved' ? 'bg-primary text-white' :
                ticket.status === 'in_progress' ? 'bg-secondary text-white' :
                'bg-warning text-white'
              }`}>
                {ticket.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTickets;
