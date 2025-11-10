import { useNavigate } from 'react-router-dom';
import './style.css';
import type { EventItem } from '../../types/EventType';

interface AdminEventCardProps {
  event: EventItem;
}

const AdminEventCard = ({ event }: AdminEventCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="event-card admin">
      <div className="event-img-wrapper">
        <img src={event.image} alt={event.name} className="event-img" />
      </div>

      <h3 className="admin-event-name">{event.name}</h3>

      <div className="event-info-row">
        <div className="event-info-item">
          <span className="label">Precio</span>
          <span className="value">${event.price}</span>
        </div>
        <div className="event-info-item">
          <span className="label">Sillas habilitadas</span>
          <span className="value">{event.availableseats}</span>
        </div>
        <div className="event-info-item">
          <span className="label">Otro</span>
          <span className="value">{event.popularity}</span>
        </div>
      </div>

      <hr className="divider" />

      <div className="event-bottom">
        <div className="event-info-item">
          <span className="label">Lugar</span>
          <span className="value">{event.location}</span>
        </div>
        <div className="event-info-item">
          <span className="label">Fecha</span>
          <span className="value">{event.date}</span>
        </div>
        <div className="event-info-item">
          <span className="label">Hora</span>
          <span className="value">{event.time}</span>
        </div>
      </div>

      <div className="event-footer">
        <button className="btn-view" onClick={() => navigate(`/edit-event/${event.id}`)}>
          Editar
        </button>
      </div>
    </div>
  );
};

export default AdminEventCard;
