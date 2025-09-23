import { useState } from 'react';
import type { FormEvent } from 'react';
import type { EventItem } from '../../../types/EventType';
import { useEvent } from '../../../context/EventContext';

const EventForm = () => {
  const { addEvent } = useEvent();

  const [formData, setFormData] = useState<Omit<EventItem, 'id'> & { imageFile?: File | null }>({
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        imageFile: e.target.files![0],
        image: '', // limpiamos URL si se sube archivo
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

    // 🔑 aquí decides qué enviar al backend:
    // - formData.image (si es URL)
    // - formData.imageFile (si es archivo local)
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

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <input
        type="text"
        name="image"
        placeholder="Imagen (URL)"
        value={formData.image}
        onChange={handleUrlChange}
      />

      <div>
        {formData.imageFile ? (
          <img src={URL.createObjectURL(formData.imageFile)} alt="preview" width={200} />
        ) : formData.image ? (
          <img src={formData.image} alt="preview" width={200} />
        ) : (
          <p>No hay imagen seleccionada</p>
        )}
      </div>

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
