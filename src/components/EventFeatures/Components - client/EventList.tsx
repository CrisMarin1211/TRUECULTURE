import { useEvent } from '../../../context/EventContext';
import EventCard from './Event/ProductCard-Client/CardClient';
import type { EventItem } from '../../../types/EventType';

const TAGS: EventItem['tags'][] = ['Musica', 'Cultural', 'Familiar', 'Diversion', 'Gastronomia'];

const EventList = () => {
  const { events } = useEvent();

  return (
    <div>
      {TAGS.map((tag) => {
        const filteredEvents = events.filter((event) => event.tags === tag);

        if (filteredEvents.length === 0) return null;

        return (
          <section key={tag}>
            <h2>{tag}</h2>
            <div>
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default EventList;
