import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import type { EventItem } from '../../types/EventType';

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setProduct] = useState<EventItem>({
    id: crypto.randomUUID(),
    image: '',
    imageFile: null,
    name: '',
    date: '',
    time: '',
    location: '',
    city: 'Cali, Colombia',
    description: '',
    price: 0,
    totalSeats: 0,
    availableSeats: 0,
    popularity: 'Media',
    tags: 'Familiar',
    expectedAttendance: 0,
    isDraft: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem('events');
    if (stored) {
      const events: EventItem[] = JSON.parse(stored);
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
    let events: EventItem[] = stored ? JSON.parse(stored) : [];
    if (id) {
      events = events.map((p) => (p.id === id ? event : p));
    } else {
      events.push(event);
    }
    localStorage.setItem('events', JSON.stringify(events));
    navigate('/list-events');
  };

  const handleDelete = () => {
    const stored = localStorage.getItem('events');
    if (!stored) return;
    const events: EventItem[] = JSON.parse(stored);
    const filtered = events.filter((p) => p.id !== event.id);
    localStorage.setItem('events', JSON.stringify(filtered));
    navigate('/list-events');
  };

  return (
    <div className="form-card">
      <div className="row-1">
        <button className="back-btn" onClick={() => navigate('/list-events')}>
          ←
        </button>
        <div className="spacer" />
      </div>

      <div className="row-2">
        <h4 className="title">Detalles del Evento</h4>
        <div className="actions">
          <button className="btn save-btn" onClick={handleSave}>
            Guardar
          </button>
          <button className="btn delete-btn" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </div>

      <div className="row-3">
        <div className="col image-col">
          <label className="input-label" htmlFor="image">
            Imagen (URL)
          </label>
          <input id="image" type="text" name="image" value={event.image} onChange={handleChange} />
        </div>

        <div className="col details-col">
          <div className="grid-2">
            <div>
              <label className="input-label" htmlFor="name">
                Nombre del Evento
              </label>
              <input id="name" type="text" name="name" value={event.name} onChange={handleChange} />
            </div>
            <div>
              <label className="input-label" htmlFor="date">
                Fecha del Evento
              </label>
              <input id="date" type="date" name="date" value={event.date} onChange={handleChange} />
            </div>
          </div>

          <div className="grid-2">
            <div>
              <label className="input-label" htmlFor="location">
                Lugar
              </label>
              <input
                id="location"
                type="text"
                name="location"
                value={event.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="input-label" htmlFor="time">
                Hora del Evento
              </label>
              <input id="time" type="text" name="time" value={event.time} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>

      <div className="row-4">
        <label className="input-label" htmlFor="description">
          Descripción del evento
        </label>
        <textarea
          id="description"
          name="description"
          value={event.description}
          onChange={handleChange}
        />
      </div>

      <div className="row-5">
        <div>
          <label className="input-label" htmlFor="price">
            Precio
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={event.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="input-label" htmlFor="totalSeats">
            Cantidad de Asientos
          </label>
          <input
            id="totalSeats"
            type="number"
            name="totalSeats"
            value={event.totalSeats}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="input-label" htmlFor="availableSeats">
            Asientos Disponibles
          </label>
          <input
            id="availableSeats"
            type="number"
            name="availableSeats"
            value={event.availableSeats}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="input-label" htmlFor="popularity">
            Nivel de Ventas
          </label>
          <input
            id="popularity"
            type="text"
            name="popularity"
            value={event.popularity}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row-6 grid-2">
        <div>
          <div className="grid-2">
            <div>
              <label className="input-label" htmlFor="tags">
                Tags
              </label>
              <input id="tags" type="text" name="tags" value={event.tags} onChange={handleChange} />
            </div>
            <div>
              <label className="input-label" htmlFor="unitsSaled">
                Unidades Vendidas
              </label>
              <input
                id="unitsSaled"
                type="number"
                name="UnitsSaled"
                value={event.expectedAttendance}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="qr-box">
            <img src="/images/qr.png" alt="QR" className="qr-img" />
            <span>Escanea el código QR para pagar fácilmente</span>
          </div>
        </div>

        <div className="col">
          <div className="placeholder-box">Contenido futuro</div>
        </div>
      </div>

      <div className="row-7">
        <button className="btn metrics-btn">Ver Métricas</button>
      </div>
    </div>
  );
};

export default CreateEvent;
