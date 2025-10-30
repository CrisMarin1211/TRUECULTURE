import React from 'react';
import type { TicketItem } from '../../types/TicketType';
import './style.css';

interface TicketsTableProps {
  tickets: TicketItem[];
}

const TicketsTable: React.FC<TicketsTableProps> = ({ tickets }) => {
  if (tickets.length === 0) {
    return <p className="no-results">No se encontraron reservas.</p>;
  }

  return (
    <div className="tickets-table-container">
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
          {tickets.map((ticket) => (
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
    </div>
  );
};

export default TicketsTable;
