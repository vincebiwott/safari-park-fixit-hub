
export type TicketStatus = 'pending' | 'in_progress' | 'resolved' | 'archived';
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';
export type Department = 'plumbing' | 'electrical' | 'ict' | 'carpentry' | 'ac_fridge' | 'general';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  block: string;
  room: string;
  department: Department;
  urgency: UrgencyLevel;
  status: TicketStatus;
  submittedBy: string;
  assignedTo?: string;
  submittedAt: Date;
  acceptedAt?: Date;
  resolvedAt?: Date;
  notes?: string;
  beforeImages?: string[];
  afterImages?: string[];
  repeatIssue?: boolean;
  previousTicketId?: string;
  daysToRepeat?: number;
}

export interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt: Date;
}
