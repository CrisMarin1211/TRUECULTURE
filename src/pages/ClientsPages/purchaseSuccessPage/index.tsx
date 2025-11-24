import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import { getOrderById } from '../../../services/orders';
import { QRCodeSVG } from 'qrcode.react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './style.css';
import type { OrderWithItems } from '../../../services/orders';

const PurchaseSuccessPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError('ID de orden no válido');
        setLoading(false);
        return;
      }

      const orderData = await getOrderById(Number(orderId));
      if (orderData) {
        setOrder(orderData);
      } else {
        setError('No se pudo cargar la información de la orden');
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  };

  const hasEvents = order?.order_items.some(item => item.item_type === 'event');

  if (loading) {
    return (
      <div className="purchase-success-page">
        <Header />
        <div className="success-loading">
          <p>Cargando detalles de tu compra...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="purchase-success-page">
        <Header />
        <div className="success-error">
          <p>{error || 'No se encontró la orden'}</p>
          <button onClick={() => navigate('/my-purchases')} className="back-btn">
            Ver mis compras
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="purchase-success-page">
      <Header />
      <div className="success-container">
        <div className="success-header">
          <CheckCircleIcon className="success-icon" />
          <h1 className="success-title">¡Compra realizada exitosamente!</h1>
          <p className="success-subtitle">
            Tu orden #{order.order_number} ha sido procesada correctamente
          </p>
        </div>

        <div className="success-content">
          <div className="order-details-section">
            <h2 className="section-title">Detalles de la orden</h2>

            <div className="detail-row">
              <span className="detail-label">Número de orden:</span>
              <span className="detail-value">{order.order_number}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Fecha:</span>
              <span className="detail-value">{formatDate(order.created_at)}</span>
            </div>

            <div className="order-items-section">
              <h3 className="items-title">Items comprados:</h3>
              {order.order_items.map((item) => (
                <div key={item.id} className="order-item-detail">
                  <div className="item-main">
                    <span className="item-name">{item.item_name}</span>
                    <span className="item-price">{formatCurrency(item.total_price)}</span>
                  </div>
                  <div className="item-secondary">
                    <span className="item-quantity">
                      Cantidad: {item.quantity} × {formatCurrency(item.unit_price)}
                    </span>
                    {item.item_type === 'event' && item.seats && Array.isArray(item.seats) && item.seats.length > 0 && (
                      <span className="item-seats">
                        Asientos: {(item.seats as string[]).join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <div className="summary-row">
                <span className="summary-label">Subtotal:</span>
                <span className="summary-value">{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="summary-row discount">
                  <span className="summary-label">Descuento:</span>
                  <span className="summary-value">- {formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="summary-row total">
                <span className="summary-label">Total:</span>
                <span className="summary-value">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {hasEvents && (
            <div className="ticket-section">
              <h2 className="section-title">Tu entrada</h2>
              <div className="ticket-container">
                <div className="qr-container">
                  <QRCodeSVG
                    value={order.order_number}
                    size={200}
                    level="H"
                    includeMargin={true}
                    fgColor="#000000"
                    bgColor="#FFFFFF"
                  />
                  <p className="qr-label">Muestra este código QR en la entrada</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="success-actions">
          <button onClick={() => navigate('/my-purchases')} className="view-orders-btn">
            Ver todas mis compras
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;

