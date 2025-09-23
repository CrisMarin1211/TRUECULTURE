import { useState } from 'react';
import { EventProvider, useEvent } from '../../context/EventContext';
import EventForm from '../../components/EventFeatures/EventComponents/Form/EventForm';
import SideBarAdmins from '../../components/SideBar admins/SideBarAdmins';
import type { EventItem } from '../../types/EventType';
import { Button } from '@mui/material';

const EventsPage = () => {
  const [formData, setFormData] = useState<Omit<EventItem, 'id'>>({
    image: '',
    imageFile: null,
    name: '',
    date: '',
    location: '',
    time: '',
    description: '',
    price: 0,
    totalSeats: 0,
    availableSeats: 0,
    popularity: 'Baja',
    tags: [],
    expectedAttendance: 0,
  });

  const [tagsOpen, setTagsOpen] = useState(false);
  const { addEvent } = useEvent();

  const handleSubmit = () => {
    addEvent(formData);
    // Limpia form si quieres
    setFormData({
      image: '',
      imageFile: null,
      name: '',
      date: '',
      location: '',
      time: '',
      description: '',
      price: 0,
      totalSeats: 0,
      availableSeats: 0,
      popularity: 'Baja',
      tags: [],
      expectedAttendance: 0,
    });
  };

  return (
    <EventProvider>
      <div className="events-root">
        <SideBarAdmins />
        <div className="events-content">
          <EventForm
            formData={formData}
            setFormData={setFormData}
            tagsOpen={tagsOpen}
            setTagsOpen={setTagsOpen}
          />
          <div className="events-buttons">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Publicar Evento
            </Button>
          </div>
        </div>
      </div>
    </EventProvider>
  );
};

export default EventsPage;
