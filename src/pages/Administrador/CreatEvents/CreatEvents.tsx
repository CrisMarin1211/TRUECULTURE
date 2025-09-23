import { EventProvider } from '../../../context/EventContext';
import EventForm from '../../../components/EventFeatures/EventComponents/Form/EventForm';
import EventList from '../../../components/EventFeatures/EventList/EventList';
import Seats from '../../../components/EventFeatures/EventComponents/SeatsCard/Seats';
import SideBarAdmins from '../../../components/SideBar admins/SideBarAdmins';

const EventsPage = () => {
  return (
    <EventProvider>
      <SideBarAdmins />
      <div style={{ padding: 20 }}>
        <h1>Eventos</h1>

        {/* Formulario para crear eventos */}
        <EventForm />

        <hr style={{ margin: '20px 0' }} />

        {/* Lista de eventos */}
        <EventList />
        <Seats />
      </div>
    </EventProvider>
  );
};

export default EventsPage;
