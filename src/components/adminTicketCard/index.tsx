import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addTicket,
  updateTicket,
  deleteTicket,
  getTicketsByOrganization,
} from '../../services/tickets';
import type { TicketItem } from '../../types/TicketType';
import { getEventsByOrganization } from '../../services/events';
import { supabase } from '../../lib/supabaseClient';
import { getUserProfileByEmail } from '../../services/users';

const CreateTicket: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [ticket, setTicket] = useState<TicketItem>({
    customer_name: '',
    order_number: '',
    ticket_type: 'General',
    quantity: 1,
    payment_status: 'Pendiente',
    event_id: 0,
    date: new Date().toISOString().split('T')[0],
    organization: '',
  });

  const [events, setEvents] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user?.email) throw new Error('No se pudo obtener el usuario');

        const profile = await getUserProfileByEmail(user.email);
        if (!profile?.organization) throw new Error('El usuario no tiene organización asignada');

        setTicket((prev) => ({
          ...prev,
          organization: profile.organization,
        }));

        const eventData = await getEventsByOrganization(profile.organization);
        setEvents(eventData);

        if (id) {
          const data = await getTicketsByOrganization(profile.organization);
          const found = data.find((t) => t.id === Number(id));
          if (found) setTicket(found);
        }
      } catch (err) {
        console.error('Error cargando datos:', err);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'event_id' ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!ticket.organization) {
        console.error('No se encontró la organización del usuario');
        return;
      }

      if (id) {
        await updateTicket(Number(id), ticket);
      } else {
        await addTicket(ticket);
      }
      navigate('/list-tickets');
    } catch (error) {
      console.error('Error al guardar ticket:', error);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteTicket(Number(id));
      navigate('/list-tickets');
    } catch (error) {
      console.error('Error al eliminar ticket:', error);
    }
  };

  return (
    <div className="form-card">
      <div className="row-1">
        <button className="back-btn" onClick={() => navigate('/list-tickets')}>
          ←
        </button>
      </div>

      <div className="row-2">
        <h4 className="title">Detalles de la Reserva</h4>
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

      <div className="row-3 grid-2">
        <div>
          <label className="input-label">Nombre del Cliente</label>
          <input
            type="text"
            name="customer_name"
            value={ticket.customer_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="input-label">Número de Orden</label>
          <input
            type="text"
            name="order_number"
            value={ticket.order_number}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row-4 grid-2">
        <div>
          <label className="input-label">Tipo de Entrada</label>
          <select name="ticket_type" value={ticket.ticket_type} onChange={handleChange}>
            <option value="General">General</option>
            <option value="VIP">VIP</option>
            <option value="Backstage">Backstage</option>
          </select>
        </div>
        <div>
          <label className="input-label">Cantidad</label>
          <input
            type="number"
            name="quantity"
            min={1}
            value={ticket.quantity}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row-5 grid-2">
        <div>
          <label className="input-label">Estado de Pago</label>
          <select name="payment_status" value={ticket.payment_status} onChange={handleChange}>
            <option value="Pagado">Pagado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Fallido">Fallido</option>
          </select>
        </div>
        <div>
          <label className="input-label">Evento Asociado</label>
          <select name="event_id" value={ticket.event_id} onChange={handleChange}>
            <option value={0}>Seleccionar evento</option>
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row-6">
        <label className="input-label">Fecha</label>
        <input type="date" name="date" value={ticket.date} onChange={handleChange} />
      </div>
    </div>
  );
};

export default CreateTicket;
