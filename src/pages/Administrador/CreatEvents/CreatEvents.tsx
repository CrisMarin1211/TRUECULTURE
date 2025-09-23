import { EventProvider } from '../../../context/EventContext';
import EventForm from '../../../components/EventFeatures/EventComponents/Form/EventForm';

const EventsPage = () => {
  return (
    <EventProvider>
      {/* Formulario para crear eventos */}
      <EventForm />

      <hr style={{ margin: '20px 0' }} />
    </EventProvider>
  );
};

export default EventsPage;
