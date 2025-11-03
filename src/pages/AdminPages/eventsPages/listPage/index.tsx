import React, { useEffect, useState } from 'react';
import './style.css';
import AdminEventCard from '../../../../components/adminEventCard';
import { useNavigate } from 'react-router-dom';
import type { EventItem } from '../../../../types/EventType';
import SidebarAdmin from '../../../../components/atomsUi/sideBarAdmin';
import { getEvents } from '../../../../services/events';
import Loader from '../../../../components/loader';

const ListEventPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error('Error cargando eventos:', err);
        setError('Error al cargar los eventos');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getEventStatus = (event: EventItem): 'Proximos' | 'Pendiente' | 'Finalizados' => {
    if (event.isdraft) return 'Pendiente';

    const eventDateTime = new Date(`${event.date}T${event.time}`);
    const now = new Date();

    return eventDateTime > now ? 'Proximos' : 'Finalizados';
  };

  const filteredEvents = events.filter((event) => {
    const searchLower = search.toLowerCase();
    const matchesSearch = event.name.toLowerCase().includes(searchLower);

    const status = getEventStatus(event);
    const matchesStatus = filterStatus ? status === filterStatus : true;

    return matchesSearch && matchesStatus;
  });

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <SidebarAdmin />
      <main className="main-content">
        <div className="header-card">
          <div className="row row-1">
            <h4 className="title">Gestión de Eventos</h4>
            <input
              type="text"
              placeholder="Buscar evento..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="row row-2">
            <div className="actions-left">
              <button className="btn-pink" onClick={() => navigate('/create-event')}>
                Nuevo Evento
              </button>
              {/* <button className="btn-outline">Visión General</button> */}
            </div>
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Filtrar por estado</option>
              <option value="Proximos">Próximos</option>
              <option value="Pendiente">Pendientes</option>
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
                <span>Próximos</span>
              </div>
              <div className="status-item">
                <span className="bubble paused"></span>
                <span>Pendientes</span>
              </div>
              <div className="status-item">
                <span className="bubble out"></span>
                <span>Finalizados</span>
              </div>
            </div>
          </div>

          <div className="events-list">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => <AdminEventCard key={event.id} event={event} />)
            ) : (
              <p>No se encontraron eventos.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListEventPage;
