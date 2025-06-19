
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ticket } from '@/types/ticket';
import { Clock, MapPin, User, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TicketCardProps {
  ticket: Ticket;
  onView?: (ticket: Ticket) => void;
  onAccept?: (ticket: Ticket) => void;
  onResolve?: (ticket: Ticket) => void;
  showActions?: boolean;
  userRole?: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onView,
  onAccept,
  onResolve,
  showActions = true,
  userRole
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'in_progress': return 'bg-secondary text-secondary-foreground';
      case 'resolved': return 'bg-primary text-primary-foreground';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-primary text-primary-foreground';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">{ticket.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {ticket.block} - {ticket.room}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {formatDistanceToNow(ticket.submittedAt, { addSuffix: true })}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Badge className={getStatusColor(ticket.status)}>
              {ticket.status.replace('_', ' ')}
            </Badge>
            <Badge className={getUrgencyColor(ticket.urgency)}>
              {ticket.urgency}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-2">{ticket.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <User className="h-4 w-4 mr-1" />
            <span>Submitted by {ticket.submittedBy}</span>
          </div>
          
          {ticket.urgency === 'critical' && (
            <div className="flex items-center text-destructive">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Urgent</span>
            </div>
          )}
        </div>
        
        {showActions && (
          <div className="flex space-x-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => onView?.(ticket)}>
              View Details
            </Button>
            
            {userRole === 'technician' && ticket.status === 'pending' && (
              <Button size="sm" onClick={() => onAccept?.(ticket)}>
                Accept Task
              </Button>
            )}
            
            {userRole === 'technician' && ticket.status === 'in_progress' && ticket.assignedTo === userRole && (
              <Button variant="outline" size="sm" onClick={() => onResolve?.(ticket)}>
                Mark Resolved
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketCard;
