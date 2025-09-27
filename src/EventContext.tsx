import { useContext, useState, createContext } from 'react';
import type { EventItem, EventProviderProps, EventContextType } from '../src/types/EventType';
import { mockEvents } from '../src/data/mockEvents';

///tomar cambios

export const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: EventProviderProps) => {
  const [events, setEvents] = useState<EventItem[]>(mockEvents);

  const addEvent: EventContextType['addEvent'] = (event) => {
    const newEvent: EventItem = { id: crypto.randomUUID(), ...event };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const updateSeats: EventContextType['updateSeats'] = (id, seatsTaken) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, availableSeats: ev.availableSeats - seatsTaken } : ev,
      ),
    );
  };

  const editEvent: EventContextType['editEvent'] = (id, updates) => {
    setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, ...updates } : ev)));
  };

  const removeEvent: EventContextType['removeEvent'] = (id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const saveEvent: EventContextType['saveEvent'] = (event) => {
    const newEvent: EventItem = { id: crypto.randomUUID(), ...event, isDraft: true };
    setEvents((prev) => [newEvent, ...prev]);
  };

  return (
    <EventContext.Provider
      value={{ events, addEvent, updateSeats, editEvent, removeEvent, saveEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent debe usarse dentro de un EventProvider');
  }
  return context;
};
