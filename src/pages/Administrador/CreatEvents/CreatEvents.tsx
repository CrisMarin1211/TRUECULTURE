import { EventProvider } from '../../../context/EventContext';
import EventForm from '../../../components/EventFeatures/EventForm/EventForm';
import EventList from '../../../components/EventFeatures/EventList/EventList';

const EventsPage = () => {
  return (
    <EventProvider>
      <div style={{ padding: 20 }}>
        <h1>Eventos</h1>

        {/* Formulario para crear eventos */}
        <EventForm />

        <hr style={{ margin: '20px 0' }} />

        {/* Lista de eventos */}
        <EventList />
      </div>
    </EventProvider>
  );
};

export default EventsPage;
