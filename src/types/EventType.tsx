export interface EventItem {
  id: string;
  image: string;
  imageFile?: File | null;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  popularity: 'Alta' | 'Media' | 'Baja';
  tags: 'Musica' | 'Cultural' | 'Familiar' | 'Diversion' | 'Gastronomia';
  expectedAttendance: number;
  isDraft?: boolean;
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
