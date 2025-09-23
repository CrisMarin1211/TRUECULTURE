import { useState } from 'react';
import type { FormEvent } from 'react';
import type { EventItem } from '../../types/EventType';

import { useEvent } from '../../context/EventContext';

const EventForm = () => {
  const { addEvent } = useEvent();

  const [formData, setFormData] = useState<Omit<EventItem, 'id'>>({
    image: '',
    name: '',
    date: '',
    location: '',
    time: '',
    description: '',
    price: 0,
    totalSeats: 0,
    availableSeats: 0,
    popularity: 'Baja',
    tags: [] as string[],
    expectedAttendance: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    addEvent(formData);

    setFormData({
      image: '',
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="image"
        placeholder="Imagen (URL)"
        value={formData.image}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Nombre del evento"
        value={formData.name}
        onChange={handleChange}
      />
      <input type="date" name="date" value={formData.date} onChange={handleChange} />
      <input
        type="text"
        name="location"
        placeholder="Lugar"
        value={formData.location}
        onChange={handleChange}
      />
      <input type="time" name="time" value={formData.time} onChange={handleChange} />
      <textarea
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="number"
        name="totalSeats"
        placeholder="Total de asientos"
        value={formData.totalSeats}
        onChange={handleChange}
      />
      <input
        type="number"
        name="availableSeats"
        placeholder="Asientos disponibles"
        value={formData.availableSeats}
        onChange={handleChange}
      />
      <select name="popularity" value={formData.popularity} onChange={handleChange}>
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>
      <select
        name="tags"
        value={formData.tags}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            tags: Array.from(e.target.selectedOptions, (opt) => opt.value),
          }))
        }
        multiple
      >
        <option value="Música">Música</option>
        <option value="Deporte">Deporte</option>
        <option value="Cultura">Cultura</option>
        <option value="Tecnología">Tecnología</option>
      </select>

      <input
        type="number"
        name="expectedAttendance"
        placeholder="Asistencia esperada"
        value={formData.expectedAttendance}
        onChange={handleChange}
      />

      <button type="submit">Crear Evento</button>
    </form>
  );
};

export default EventForm;
