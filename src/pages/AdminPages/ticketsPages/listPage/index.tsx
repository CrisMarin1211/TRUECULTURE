import React, { useEffect, useState } from 'react';
import './style.css';
import SidebarAdmin from '../../../../components/atomsUi/sideBarAdmin';
import { useNavigate } from 'react-router-dom';
import { getTicketsByOrganization } from '../../../../services/tickets';
import type { TicketItem } from '../../../../types/TicketType';
import Loader from '../../../../components/loader';
import { getUserProfileByEmail } from '../../../../services/users';
import { supabase } from '../../../../lib/supabaseClient';

const ListTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user?.email) throw new Error('Usuario no autenticado');

        const profile = await getUserProfileByEmail(user.email);
        if (!profile?.organization) throw new Error('El usuario no tiene organización');

        const data = await getTicketsByOrganization(profile.organization);
        setTickets(data);
      } catch (err) {
        console.error('Error cargando tickets:', err);
        setError('Error al cargar las reservas');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((t) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      t.customer_name.toLowerCase().includes(searchLower) ||
      t.order_number.toLowerCase().includes(searchLower) ||
      t.ticket_type.toLowerCase().includes(searchLower);

    const matchesStatus = filterStatus ? t.payment_status === filterStatus : true;
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
            <h4 className="title">Gestión de Reservas</h4>
            <input
              type="text"
              placeholder="Buscar reserva..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="row row-2">
            <div className="actions-left">
              <button className="btn-pink" onClick={() => navigate('/create-ticket')}>
                Nueva Reserva
              </button>
              {/* <button className="btn-outline">Visión General</button> */}
            </div>

            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Filtrar por estado</option>
              <option value="Pagado">Pagado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Fallido">Fallido</option>
            </select>
          </div>
        </div>

        <div className="tickets-container">
          <div className="tickets-header">
            <h3>Todas las Reservas</h3>
          </div>

          <div className="tickets-table-container">
            {filteredTickets.length > 0 ? (
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>Comprador</th>
                    <th>Número de Orden</th>
                    <th>Tipo de Boleto</th>
                    <th>Cantidad</th>
                    <th>Estado de Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.customer_name}</td>
                      <td>{ticket.order_number}</td>
                      <td>{ticket.ticket_type}</td>
                      <td>{ticket.quantity}</td>
                      <td className={`status ${ticket.payment_status.toLowerCase()}`}>
                        {ticket.payment_status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No se encontraron reservas.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListTicketsPage;
