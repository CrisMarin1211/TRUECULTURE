import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';

type Event = {
  id: string;
  image: string;
  imageFile: File | null;
  name: string;
  dateEvent: string;
  timeEvent: string;
  location: string;
  city: string;
  description: string;
  price: number;
  totalStock: number;
  availableStock: number;
  popularity: string;
  tags: string;
  UnitsSaled: number;
  isDraft: boolean;
};

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setProduct] = useState<Event>({
    id: crypto.randomUUID(),
    image: '',
    imageFile: null,
    name: '',
    dateEvent: '',
    timeEvent: '',
    location: '',
    city: '',
    description: '',
    price: 0,
    totalStock: 0,
    availableStock: 0,
    popularity: '',
    tags: '',
    UnitsSaled: 0,
    isDraft: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem('events');
    if (stored) {
      const events: Product[] = JSON.parse(stored);
      const found = events.find((p) => p.id === id);
      if (found) setProduct(found);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name.toLowerCase().includes('stock') || name === 'UnitsSaled'
          ? Number(value)
          : value,
    }));
  };

  const handleSave = () => {
    const stored = localStorage.getItem('events');
    let events: Product[] = stored ? JSON.parse(stored) : [];

    if (id) {
      events = events.map((p) => (p.id === id ? event : p));
    } else {
      events.push(event);
    }

    localStorage.setItem('events', JSON.stringify(events));
    navigate('/create-event');
  };

  const handleDelete = () => {
    const stored = localStorage.getItem('events');
    if (!stored) return;
    const events: Product[] = JSON.parse(stored);
    const filtered = events.filter((p) => p.id !== event.id);
    localStorage.setItem('events', JSON.stringify(filtered));
    navigate('/create-event');
  };

  return (
    <div className="form-card">
      <div className="row row-1">
        <button className="back-btn" onClick={() => navigate('/create-event')}>
          ←
        </button>
      </div>

      <div className="row row-2">
        <h4>Detalles del Evento</h4>
        <div className="actions">
          <button className="btn save-btn" onClick={handleSave}>
            Guardar
          </button>
          <button className="btn delete-btn" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </div>

      <div className="row row-3">
        <div className="col image-col">
          <input
            type="text"
            name="image"
            placeholder="URL de la imagen"
            value={event.image}
            onChange={handleChange}
          />
        </div>
        <div className="col details-col">
          <div className="grid-2">
            <input
              type="text"
              name="name"
              placeholder="Nombre del Evento"
              value={event.name}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dateEvent"
              placeholder="Fecha del Evento"
              value={event.dateEvent}
              onChange={handleChange}
            />
          </div>
          <div className="grid-2">
            <input
              type="text"
              name="location"
              placeholder="Lugar"
              value={event.location}
              onChange={handleChange}
            />
            <input
              type="text"
              name="timeEvent"
              placeholder="Hora del Evento"
              value={event.timeEvent}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row row-4">
        <textarea
          name="description"
          placeholder="Descripción del evento"
          value={event.description}
          onChange={handleChange}
        />
      </div>

      <div className="row row-5 grid-4">
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={event.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="totalStock"
          placeholder="Cantidad de Asientos"
          value={event.totalStock}
          onChange={handleChange}
        />
        <input
          type="number"
          name="availableStock"
          placeholder="Asientos Disponibles"
          value={event.availableStock}
          onChange={handleChange}
        />
        <input
          type="text"
          name="popularity"
          placeholder="Nivel de Ventas"
          value={event.popularity}
          onChange={handleChange}
        />
      </div>

      <div className="row row-6 grid-2">
        <div className="col">
          <div className="grid-2">
            <input
              type="text"
              name="tags"
              placeholder="Tags"
              value={event.tags}
              onChange={handleChange}
            />
            <input
              type="number"
              name="UnitsSaled"
              placeholder="Unidades Vendidas"
              value={event.UnitsSaled}
              onChange={handleChange}
            />
          </div>
          <div className="qr-box"></div>
        </div>
        <div className="col">
          <div className="placeholder-box">Contenido futuro</div>
        </div>
      </div>

      <div className="row row-7">
        <button className="btn metrics-btn">Ver Métricas</button>
      </div>
    </div>
  );
};

export default CreateProduct;
