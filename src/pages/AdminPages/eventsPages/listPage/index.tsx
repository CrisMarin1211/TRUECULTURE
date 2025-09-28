import React, { useEffect, useState } from 'react';
import './style.css';
import AdminEventCard from '../../../../components/adminEventCard';
import { useNavigate } from 'react-router-dom';
import type { EventItem } from '../../../../types/EventType';
import SidebarAdmin from '../../../../components/atomsUi/sideBarAdmin';

const ListEventPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  return (
    <div className="page-container">
      <SidebarAdmin />
      <main className="main-content">
        <div className="header-card">
          <div className="row row-1">
            <h4 className="title">Gestión de Eventos</h4>
            <input type="text" placeholder="Search ..." className="search-input" />
          </div>
          <div className="row row-2">
            <div className="actions-left">
              <button className="btn-pink" onClick={() => navigate('/create-event')}>
                Nuevo Evento
              </button>
              <button className="btn-outline">Visión General</button>
            </div>
            <select className="filter-select">
              <option value="">Filtrar por estado</option>
              <option value="Proximos">Proximos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Finalizados">Finalizados</option>
            </select>
          </div>
        </div>
        <div className="events-container">
          <div className="events-header">
            <h3>Todos los Eventos</h3>
            <div className="status-bubbles">
              <div className="status-item">
                <span className="bubble active"></span>
                <span>Proximos</span>
              </div>
              <div className="status-item">
                <span className="bubble paused"></span>
                <span>Pendiente</span>
              </div>
              <div className="status-item">
                <span className="bubble out"></span>
                <span>Finalizados</span>
              </div>
            </div>
          </div>

          <div className="events-list">
            {events.map((event) => (
              <AdminEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListEventPage;
