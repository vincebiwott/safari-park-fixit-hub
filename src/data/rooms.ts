
import { Room, Block } from '@/types/room';

const generateRooms = (): Room[] => {
  const rooms: Room[] = [];
  
  // Block 100: 100-107, 150-158
  for (let i = 100; i <= 107; i++) {
    rooms.push({
      id: `100-${i}`,
      block: '100',
      number: i.toString(),
      fullNumber: `100-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }
  for (let i = 150; i <= 158; i++) {
    rooms.push({
      id: `100-${i}`,
      block: '100',
      number: i.toString(),
      fullNumber: `100-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }

  // Block 200: 200-211, 250-261
  for (let i = 200; i <= 211; i++) {
    rooms.push({
      id: `200-${i}`,
      block: '200',
      number: i.toString(),
      fullNumber: `200-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }
  for (let i = 250; i <= 261; i++) {
    rooms.push({
      id: `200-${i}`,
      block: '200',
      number: i.toString(),
      fullNumber: `200-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }

  // Block 300: 300-307, 309, 350-359
  for (let i = 300; i <= 307; i++) {
    rooms.push({
      id: `300-${i}`,
      block: '300',
      number: i.toString(),
      fullNumber: `300-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }
  rooms.push({
    id: '300-309',
    block: '300',
    number: '309',
    fullNumber: '300-309',
    isActive: true,
    sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
  });
  for (let i = 350; i <= 359; i++) {
    rooms.push({
      id: `300-${i}`,
      block: '300',
      number: i.toString(),
      fullNumber: `300-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }

  // Block 400: 400-409, 450-459
  for (let i = 400; i <= 409; i++) {
    rooms.push({
      id: `400-${i}`,
      block: '400',
      number: i.toString(),
      fullNumber: `400-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }
  for (let i = 450; i <= 459; i++) {
    rooms.push({
      id: `400-${i}`,
      block: '400',
      number: i.toString(),
      fullNumber: `400-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }

  // Block 500: 500-511, 550-561
  for (let i = 500; i <= 511; i++) {
    rooms.push({
      id: `500-${i}`,
      block: '500',
      number: i.toString(),
      fullNumber: `500-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }
  for (let i = 550; i <= 561; i++) {
    rooms.push({
      id: `500-${i}`,
      block: '500',
      number: i.toString(),
      fullNumber: `500-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }

  // Block 600A: 600-617
  for (let i = 600; i <= 617; i++) {
    rooms.push({
      id: `600A-${i}`,
      block: '600A',
      number: i.toString(),
      fullNumber: `600A-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }

  // Block 600B: 650-667
  for (let i = 650; i <= 667; i++) {
    rooms.push({
      id: `600B-${i}`,
      block: '600B',
      number: i.toString(),
      fullNumber: `600B-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }

  // Block 700: 700-711, 750-761
  for (let i = 700; i <= 711; i++) {
    rooms.push({
      id: `700-${i}`,
      block: '700',
      number: i.toString(),
      fullNumber: `700-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }
  for (let i = 750; i <= 761; i++) {
    rooms.push({
      id: `700-${i}`,
      block: '700',
      number: i.toString(),
      fullNumber: `700-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }

  // Block 800: 800-811, 850-860
  for (let i = 800; i <= 811; i++) {
    rooms.push({
      id: `800-${i}`,
      block: '800',
      number: i.toString(),
      fullNumber: `800-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }
  for (let i = 850; i <= 860; i++) {
    rooms.push({
      id: `800-${i}`,
      block: '800',
      number: i.toString(),
      fullNumber: `800-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }

  // Block 900: 900-906, 950-956
  for (let i = 900; i <= 906; i++) {
    rooms.push({
      id: `900-${i}`,
      block: '900',
      number: i.toString(),
      fullNumber: `900-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }
  for (let i = 950; i <= 956; i++) {
    rooms.push({
      id: `900-${i}`,
      block: '900',
      number: i.toString(),
      fullNumber: `900-${i}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting']
    });
  }

  // Apartments
  const apartments = ['1', '2', '620', '720', '721', '722'];
  apartments.forEach(apt => {
    rooms.push({
      id: `APT-${apt}`,
      block: 'APT',
      number: apt,
      fullNumber: `APT-${apt}`,
      isActive: true,
      sections: ['ceiling', 'shower', 'tv', 'door', 'wall_socket', 'air_conditioning', 'bathroom', 'lighting', 'plumbing', 'electrical']
    });
  });

  return rooms;
};

export const HOTEL_ROOMS = generateRooms();

export const ROOM_BLOCKS = ['100', '200', '300', '400', '500', '600A', '600B', '700', '800', '900', 'APT'] as Block[];

export const ROOM_SECTIONS = [
  { id: 'ceiling', name: 'Ceiling', category: 'carpenter' },
  { id: 'shower', name: 'Shower', category: 'plumber' },
  { id: 'tv', name: 'TV', category: 'ict' },
  { id: 'door', name: 'Door', category: 'carpenter' },
  { id: 'wall_socket', name: 'Wall Socket', category: 'electrician' },
  { id: 'air_conditioning', name: 'Air Conditioning', category: 'ac_fridge' },
  { id: 'bathroom', name: 'Bathroom', category: 'plumber' },
  { id: 'lighting', name: 'Lighting', category: 'electrician' },
  { id: 'plumbing', name: 'Plumbing', category: 'plumber' },
  { id: 'electrical', name: 'Electrical', category: 'electrician' },
  { id: 'furniture', name: 'Furniture', category: 'carpenter' },
  { id: 'window', name: 'Window', category: 'carpenter' },
  { id: 'flooring', name: 'Flooring', category: 'carpenter' }
];
