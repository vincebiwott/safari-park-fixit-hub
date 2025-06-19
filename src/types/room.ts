
export type Block = '100' | '200' | '300' | '400' | '500' | '600A' | '600B' | '700' | '800' | '900' | 'APT';

export type RoomSection = 
  | 'ceiling' 
  | 'shower' 
  | 'tv' 
  | 'door' 
  | 'wall_socket' 
  | 'air_conditioning' 
  | 'bathroom' 
  | 'lighting' 
  | 'plumbing' 
  | 'electrical' 
  | 'furniture' 
  | 'window' 
  | 'flooring';

export interface Room {
  id: string;
  block: Block;
  number: string;
  fullNumber: string; // e.g., "100-101" or "APT-1"
  isActive: boolean;
  sections: RoomSection[];
}

export interface RoomIssue {
  id: string;
  roomId: string;
  section: RoomSection;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  submittedBy: string;
  submittedAt: Date;
  status: 'pending' | 'in_progress' | 'resolved';
  assignedCategory?: string;
  photos?: string[];
  notes?: string;
}
