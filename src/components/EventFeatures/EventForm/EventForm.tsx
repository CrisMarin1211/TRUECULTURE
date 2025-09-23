import { useState, useMemo, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { EventItem } from '../../../types/EventType';
import { useEvent } from '../../../context/EventContext';

const EventForm = () => {
  const { events, addEvent, removeEvent } = useEvent();

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

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.value,
      imageFile: null,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addEvent(formData);

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

  const handleDelete = (id: string) => {
    removeEvent(id);
  };

  // Componente para mostrar preview de imagen seguro
  const EventImage = ({
    imageFile,
    image,
    name,
  }: {
    imageFile?: File | null;
    image: string;
    name: string;
  }) => {
    const objectUrl = useMemo(() => {
      if (imageFile instanceof File) return URL.createObjectURL(imageFile);
      return null;
    }, [imageFile]);

    useEffect(() => {
      return () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }, [objectUrl]);

    if (imageFile instanceof File) return <img src={objectUrl!} alt={name} width={200} />;
    if (image) return <img src={image} alt={name} width={200} />;
    return null;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Preview dentro de la "casita" */}
        <div>
          {formData.name && <strong>{formData.name}</strong>}
          <EventImage imageFile={formData.imageFile} image={formData.image} name={formData.name} />
        </div>

        <input type="file" accept="image/*" onChange={handleFileChange} />
        <input
          type="text"
          name="image"
          placeholder="Imagen (URL)"
          value={formData.image}
          onChange={handleUrlChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Nombre del evento"
          value={formData.name}
          onChange={handleChange}
        />
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
        <input type="time" name="time" value={formData.time} onChange={handleChange} />
        <input
          type="text"
          name="location"
          placeholder="Lugar"
          value={formData.location}
          onChange={handleChange}
        />
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

        <button type="submit">Publicar Evento</button>
      </form>

      <div>
        <h2>Eventos creados</h2>
        {events.length === 0 && <p>No hay eventos</p>}
        {events.map((event) => (
          <div key={event.id}>
            <strong>{event.name}</strong>
            <EventImage imageFile={event.imageFile} image={event.image} name={event.name} />
            <p>{event.description}</p>
            <button type="button" onClick={() => handleDelete(event.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventForm;
