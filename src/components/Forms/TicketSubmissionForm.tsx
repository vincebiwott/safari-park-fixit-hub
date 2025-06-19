
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { HOTEL_ROOMS, ROOM_BLOCKS, ROOM_SECTIONS } from '@/data/rooms';
import { Block, RoomSection } from '@/types/room';
import { toast } from '@/hooks/use-toast';
import { MapPin, AlertTriangle, FileText } from 'lucide-react';

const TicketSubmissionForm: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<Block | ''>('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedSections, setSelectedSections] = useState<RoomSection[]>([]);
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [description, setDescription] = useState('');

  const availableRooms = HOTEL_ROOMS.filter(room => room.block === selectedBlock);

  const toggleSection = (section: RoomSection) => {
    setSelectedSections(prev => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom || selectedSections.length === 0 || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically submit to your backend
    toast({
      title: "Ticket Submitted",
      description: `Maintenance request for room ${selectedRoom} has been submitted successfully`,
    });

    // Reset form
    setSelectedBlock('');
    setSelectedRoom('');
    setSelectedSections([]);
    setDescription('');
    setUrgency('medium');
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-gray-900">Submit Maintenance Request</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Room Selection</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="block">Block</Label>
                <Select value={selectedBlock} onValueChange={(value: Block) => {
                  setSelectedBlock(value);
                  setSelectedRoom('');
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a block" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROOM_BLOCKS.map(block => (
                      <SelectItem key={block} value={block}>
                        {block === 'APT' ? 'Apartments' : `Block ${block}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="room">Room</Label>
                <Select value={selectedRoom} onValueChange={setSelectedRoom} disabled={!selectedBlock}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRooms.map(room => (
                      <SelectItem key={room.id} value={room.fullNumber}>
                        {room.fullNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Room Sections (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                {ROOM_SECTIONS.map(section => (
                  <Button
                    key={section.id}
                    type="button"
                    variant={selectedSections.includes(section.id as RoomSection) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSection(section.id as RoomSection)}
                    className="justify-start"
                  >
                    {section.name}
                  </Button>
                ))}
              </div>
              {selectedSections.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Selected sections:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSections.map(sectionId => {
                      const section = ROOM_SECTIONS.find(s => s.id === sectionId);
                      return (
                        <Badge key={sectionId} variant="secondary">
                          {section?.name} → {section?.category}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select value={urgency} onValueChange={(value: 'low' | 'medium' | 'high' | 'critical') => setUrgency(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-green-500`}></div>
                      <span>Low Priority</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-yellow-500`}></div>
                      <span>Medium Priority</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-orange-500`}></div>
                      <span>High Priority</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="critical">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-red-500`}></div>
                      <span>Critical - Immediate Action</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Problem Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide a detailed description of the maintenance issue..."
                rows={4}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <AlertTriangle className="h-4 w-4" />
                <span>All requests are automatically assigned to appropriate technicians</span>
              </div>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Submit Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Select multiple sections if the problem affects several areas</li>
            <li>• Use "Critical" priority only for safety hazards or guest-impacting issues</li>
            <li>• Provide detailed descriptions to help technicians prepare properly</li>
            <li>• You can track your submitted requests in the "My Tickets" section</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketSubmissionForm;
