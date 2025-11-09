import React, { useEffect, useState } from 'react';
import './style.css';
import type { OrderItem } from '../../../types/OrderItemsType';
import { getOrdersByOrganization, updateShippingStatus } from '../../../services/orderItems';
import Loader from '../../../components/loader';
import SidebarAdmin from '../../../components/atomsUi/sideBarAdmin';

const ListOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrdersByOrganization();
        setOrders(data);
      } catch (error) {
        console.error('Error cargando órdenes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id: number, status: OrderItem['shipping_status']) => {
    try {
      await updateShippingStatus(id, status as NonNullable<OrderItem['shipping_status']>);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? { ...order, shipping_status: status, updated_at: new Date().toISOString() }
            : order,
        ),
      );
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-container">
      <SidebarAdmin />

      <main className="main-content">
        <div className="header-card">
          <h4 className="title">Gestión de Órdenes</h4>
        </div>

        <div className="tickets-container">
          <div className="tickets-header">
            <h3>Todas las Órdenes</h3>
          </div>

          <div className="tickets-table-container">
            {orders.length > 0 ? (
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Estado Envío</th>
                    <th>Última actualización</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.item_name}</td>
                      <td>{order.quantity}</td>
                      <td>${order.total_price}</td>
                      <td>
                        <select
                          value={order.shipping_status || 'Pending'}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id,
                              e.target.value as OrderItem['shipping_status'],
                            )
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td>
                        {order.updated_at
                          ? new Date(order.updated_at).toLocaleString()
                          : 'Sin actualizar'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay órdenes disponibles.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListOrdersPage;