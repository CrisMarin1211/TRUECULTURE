import { useContext, useState, useEffect, createContext } from 'react';
import type { EventItem, EventProviderProps, EventContextType } from '../types/EventType';
import {
  getEvents,
  addEvent as addEventService,
  updateEvent,
  deleteEvent,
} from '../services/events';

export const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: EventProviderProps) => {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEvents();
      console.log('🎭 Data de Supabase (events):', data);
      setEvents(data);
    };
    fetchData();
  }, []);

  const addEvent: EventContextType['addEvent'] = async (event) => {
    const data = await addEventService(event);
    if (data && data.length > 0) {
      setEvents((prev) => [data[0], ...prev]);
    }
  };

  const updateSeats: EventContextType['updateSeats'] = async (id, seatsTaken) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, availableseats: ev.availableseats - seatsTaken } : ev,
      ),
    );

    const current = events.find((e) => e.id === id);
    if (current) {
      const newAvailable = current.availableseats - seatsTaken;
      await updateEvent(id, { availableseats: newAvailable });
    }
  };

  const editEvent: EventContextType['editEvent'] = async (id, updates) => {
    const data = await updateEvent(id, updates);
    if (data && data.length > 0) {
      setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, ...data[0] } : ev)));
    }
  };

  const removeEvent: EventContextType['removeEvent'] = async (id) => {
    await deleteEvent(id);
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const saveEvent: EventContextType['saveEvent'] = async (event) => {
    const draft = { ...event, isdraft: true };
    const data = await addEventService(draft);
    if (data && data.length > 0) {
      setEvents((prev) => [data[0], ...prev]);
    }
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
