import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { addEvent, deleteEvent, getEvents, updateEvent } from '../../services/events';
import { defaultEvent, type EventItem } from '../../types/EventType';
import { supabase } from '../../lib/supabaseClient';
import { getUserOrganizationByEmail } from '../../services/users';

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState<EventItem>({
    ...defaultEvent,
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

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user?.email) {
          const organization = await getUserOrganizationByEmail(user.email);
          if (organization) {
            setEvent((prev) => ({
              ...prev,
              organization,
            }));
          }
        }
      } catch (error) {
        console.error('Error al obtener organización del usuario:', error);
      }
    };

    fetchOrganization();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const target = e.target;
    const { name, value } = target;

    setEvent((prev) => ({
      ...prev,
      [name]: ['price', 'totalseats', 'availableseats', 'expectedattendance'].includes(name)
        ? Number(value)
        : name === 'isdraft'
          ? value === 'true'
          : value,
    }));
  };

  const handleSave = async () => {
    const requiredFields = [
      'name',
      'date',
      'time',
      'location',
      'description',
      'price',
      'totalseats',
      'availableseats',
      'city',
      'tags',
      'popularity',
    ];

    const missingFields = requiredFields.filter(
      (field) => event[field as keyof EventItem] === '' || event[field as keyof EventItem] === 0,
    );

    if (missingFields.length > 0) {
      alert('Por favor completa todos los campos obligatorios antes de guardar.');
      return;
    }

    try {
      if (id) {
        await updateEvent(id, event);
        alert('Evento actualizado correctamente');
      } else {
        await addEvent(event);
        alert('Evento creado correctamente');
        setEvent({
          ...defaultEvent,
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
          <select
            id="popularity"
            name="popularity"
            value={event.popularity}
            onChange={handleChange}
          >
            <option value="">Selecciona una opción</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
      </div>

      <div className="row-5">
        <div>
          <label className="input-label" htmlFor="city">
            Ciudad
          </label>
          <select id="city" name="city" value={event.city} onChange={handleChange}>
            <option value="">Selecciona una ciudad</option>
            <option value="Cali, Colombia">Cali, Colombia</option>
            <option value="Bogotá, Colombia">Bogotá, Colombia</option>
          </select>
        </div>

        <div>
          <label className="input-label" htmlFor="tags">
            Categoría / Tags
          </label>
          <select id="tags" name="tags" value={event.tags} onChange={handleChange}>
            <option value="">Selecciona una categoría</option>
            <option value="Musica">Música</option>
            <option value="Cultural">Cultural</option>
            <option value="Familiar">Familiar</option>
            <option value="Diversion">Diversión</option>
            <option value="Gastronomia">Gastronomía</option>
          </select>
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
        <div>
          <label className="input-label" htmlFor="name">
            Dirección
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={event.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="input-label" htmlFor="isdraft">
            Borrador
          </label>
          <select id="isdraft" name="isdraft" value={String(event.isdraft)} onChange={handleChange}>
            <option value="">Selecciona</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      {/* <div className="qr-box">
        <img src="/images/qr.png" alt="QR" className="qr-img" />
        <span>Escanea el código QR para acceder al evento</span>
      </div>

      <div className="row-7">
        <button className="btn metrics-btn">Ver Métricas</button>
      </div> */}
    </div>
  );
};

export default CreateEvent;
