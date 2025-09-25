import { useEvent } from '../../../context/EventContext';
import EventCard from './EventCard-Client/CardClient';

const EventList = () => {
  const { events } = useEvent();

  return (
    <div>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
