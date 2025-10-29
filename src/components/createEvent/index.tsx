import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { addEvent, deleteEvent, getEvents, updateEvent } from '../../services/events';
import type { EventItem } from '../../types/EventType';

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState<EventItem>({
    image: '',
    imagefile: null,
    name: '',
    date: '',
    time: '',
    location: '',
    address: '',
    city: 'Cali, Colombia',
    description: '',
    price: 0,
    totalseats: 0,
    availableseats: 0,
    popularity: 'Media',
    tags: 'Musica',
    expectedattendance: 0,
    isdraft: false,
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        const events = await getEvents();
        const found = events.find((e) => String(e.id) === id);
        if (found) setEvent(found);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: ['price', 'totalseats', 'availableseats', 'expectedattendance'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSave = async () => {
    try {
      if (id) {
        await updateEvent(id, event);
        alert('Evento actualizado correctamente');
      } else {
        await addEvent(event);
        alert('Evento creado correctamente');
        setEvent({
          image: '',
          imagefile: null,
          name: '',
          date: '',
          time: '',
          location: '',
          address: '',
          city: 'Cali, Colombia',
          description: '',
          price: 0,
          totalseats: 0,
          availableseats: 0,
          popularity: 'Media',
          tags: 'Musica',
          expectedattendance: 0,
          isdraft: false,
        });
      }
      navigate('/list-events');
    } catch (err) {
      console.error(err);
      alert('Error guardando el evento');
    }
  };

  const handleDelete = async () => {
    if (!id) return alert('No hay un evento para eliminar');
    if (!confirm('¿Seguro que quieres eliminar este evento?')) return;
    try {
      await deleteEvent(id);
      alert('Evento eliminado');
      navigate('/list-events');
    } catch (err) {
      console.error(err);
      alert('Error eliminando el evento');
    }
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
          {id && (
            <button className="btn delete-btn" onClick={handleDelete}>
              Eliminar
            </button>
          )}
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
              <input id="time" type="time" name="time" value={event.time} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>

      <div className="row-4">
        <label className="input-label" htmlFor="description">
          Descripción del Evento
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
          <label className="input-label" htmlFor="totalseats">
            Total Asientos
          </label>
          <input
            id="totalseats"
            type="number"
            name="totalseats"
            value={event.totalseats}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="input-label" htmlFor="availableseats">
            Asientos Disponibles
          </label>
          <input
            id="availableseats"
            type="number"
            name="availableseats"
            value={event.availableseats}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="input-label" htmlFor="popularity">
            Popularidad
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
              <label className="input-label" htmlFor="expectedattendance">
                Asistencia Esperada
              </label>
              <input
                id="expectedattendance"
                type="number"
                name="expectedattendance"
                value={event.expectedattendance}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="qr-box">
            <img src="/images/qr.png" alt="QR" className="qr-img" />
            <span>Escanea el código QR para acceder al evento</span>
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
