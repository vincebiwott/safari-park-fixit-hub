
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Search, Filter, Clock, MapPin } from 'lucide-react';

const MyTickets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - replace with actual data fetching
  const tickets = [
    {
      id: '1',
      title: 'Air conditioning not working',
      room: '300-305',
      sections: ['air_conditioning'],
      status: 'in_progress',
      urgency: 'high',
      submittedAt: new Date('2024-01-15'),
      assignedTo: 'Mike AC Tech'
    },
    {
      id: '2',
      title: 'Leaky shower faucet',
      room: '200-210',
      sections: ['shower', 'plumbing'],
      status: 'resolved',
      urgency: 'medium',
      submittedAt: new Date('2024-01-14'),
      assignedTo: 'John Plumber',
      resolvedAt: new Date('2024-01-14')
    },
    {
      id: '3',
      title: 'TV not displaying properly',
      room: '100-102',
      sections: ['tv'],
      status: 'pending',
      urgency: 'low',
      submittedAt: new Date('2024-01-13')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500 text-white';
      case 'in_progress': return 'bg-blue-500 text-white';
      case 'resolved': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-gray-900">My Tickets</h1>
        </div>
        <div className="text-sm text-gray-600">
          Total: {tickets.length} tickets
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tickets by title or room..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="grid gap-4">
        {filteredTickets.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No tickets found matching your criteria</p>
            </CardContent>
          </Card>
        ) : (
          filteredTickets.map(ticket => (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{ticket.title}</h3>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getUrgencyColor(ticket.urgency)}>
                          {ticket.urgency}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        Room {ticket.room}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {ticket.submittedAt.toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {ticket.sections.map(section => (
                        <Badge key={section} variant="outline" className="text-xs">
                          {section.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>

                    {ticket.assignedTo && (
                      <p className="text-sm text-gray-600">
                        Assigned to: <span className="font-medium">{ticket.assignedTo}</span>
                      </p>
                    )}

                    {ticket.resolvedAt && (
                      <p className="text-sm text-green-600">
                        Resolved: {ticket.resolvedAt.toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {ticket.status === 'resolved' && (
                      <Button variant="outline" size="sm">
                        Rate Service
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MyTickets;
