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
}

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
