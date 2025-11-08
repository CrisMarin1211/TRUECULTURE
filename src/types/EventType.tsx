export interface EventItem {
  id?: string;
  image: string;
  imagefile?: File | null;
  name: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  city: 'Cali, Colombia' | 'Bogotá, Colombia';
  description: string;
  price: number;
  totalseats: number;
  availableseats: number;
  popularity: 'Alta' | 'Media' | 'Baja';
  tags: 'Musica' | 'Cultural' | 'Familiar' | 'Diversion' | 'Gastronomia';
  expectedattendance: number;
  isdraft?: boolean;
  organization?: string;
}

export const defaultEvent: EventItem = {
  image: '',
  imagefile: null,
  name: '',
  date: '',
  time: '',
  location: '',
  address: '',
  city: 'Cali, Colombia',
  description: '',
  price: 0,
  totalseats: 0,
  availableseats: 0,
  popularity: 'Media',
  tags: 'Musica',
  expectedattendance: 0,
  isdraft: false,
};

export interface EventProviderProps {
  children: React.ReactNode;
}

export interface EventContextType {
  events: EventItem[];
  addEvent: (event: Omit<EventItem, 'id'>) => void;
  updateSeats: (id: string, seatsTaken: number) => void;
  editEvent: (id: string, updates: Partial<EventItem>) => void;
  removeEvent: (id: string) => void;
  saveEvent: (event: Omit<EventItem, 'id'>) => void;
}

export interface UpcomingEvent {
  id: number;
  image: string;
  name: string;
  date: string;
}