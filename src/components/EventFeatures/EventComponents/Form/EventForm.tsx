import { useState } from 'react';
import { useEvent } from '../../../../context/EventContext';
import EventImage from '../EventImage/EventImage';
import EventFields from '../EventFields/EventFields';
import EventStats from '../Stats/EventStats';
import EventTags from '../EventTags/EventTags';
import type { EventItem } from '../../../../types/EventType';
import './EvenForm.css';

type EventFormData = Omit<EventItem, 'id'>;

const defaultFormData: EventFormData = {
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
};

const EventForm = () => {
  const { addEvent } = useEvent();
  const [formData, setFormData] = useState<EventFormData>(defaultFormData);

  const [tagsOpen, setTagsOpen] = useState(false);

  const toggleTags = () => setTagsOpen((open) => !open);

  const handleTagsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTags = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFormData((prev) => ({ ...prev, tags: selectedTags }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // No actualizar tags aquí para evitar conflicto
    if (name === 'tags') return;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' ||
        name === 'totalSeats' ||
        name === 'availableSeats' ||
        name === 'expectedAttendance'
          ? Number(value)
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        image: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addEvent(formData);
    setFormData(defaultFormData);
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="event-form__main">
        <div className="event-form__left">
          <div className="event-form__image-name">{formData.name}</div>
          <div className="event-form__image">
            <EventImage
              imageFile={formData.imageFile}
              image={formData.image}
              name={formData.name}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <input
              type="text"
              name="image"
              placeholder="Imagen (URL)"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            className="event-form__description"
          />
        </div>
        <EventFields formData={formData} onChange={handleChange} />
      </div>
      <EventStats formData={formData} onChange={handleChange} />

      <EventTags
        tags={formData.tags}
        onChange={handleTagsChange}
        open={tagsOpen}
        toggleOpen={toggleTags}
      />
      <button type="submit">Publicar Evento</button>
    </form>
  );
};

export default EventForm;
