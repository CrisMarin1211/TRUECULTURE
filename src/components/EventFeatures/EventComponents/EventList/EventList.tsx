import { useEvent } from '../../../../context/EventContext';
import EventCard from '../EventCard/EventCard';

const EventList = () => {
  const { events } = useEvent();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
