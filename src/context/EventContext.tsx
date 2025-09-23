import { useContext, useState, createContext } from 'react';
import type { EventItem, EventProviderProps, EventContextType } from '../types/EventType';

export const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: EventProviderProps) => {
  const [events, setEvents] = useState<EventItem[]>([]);

  // ✅ Agregar evento
  const addEvent: EventContextType['addEvent'] = (event) => {
    const newEvent: EventItem = { id: crypto.randomUUID(), ...event };
    setEvents((prev) => [newEvent, ...prev]);
  };

  // ✅ Actualizar asientos disponibles
  const updateSeats: EventContextType['updateSeats'] = (id, seatsTaken) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, availableSeats: ev.availableSeats - seatsTaken } : ev,
      ),
    );
  };

  // ✅ Editar evento
  const editEvent: EventContextType['editEvent'] = (id, updates) => {
    setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, ...updates } : ev)));
  };

  // ✅ Eliminar evento
  const removeEvent: EventContextType['removeEvent'] = (id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateSeats, editEvent, removeEvent }}>
      {children}
    </EventContext.Provider>
  );
};

// ✅ Hook personalizado
export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent debe usarse dentro de un EventProvider');
  }
  return context;
};
