import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import './style.css';
import { supabase } from '../../../lib/supabaseClient';
import { CircularProgress } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { QRCodeSVG } from 'qrcode.react';
import { getUserOrders } from '../../../services/orders';
import type { OrderWithItems } from '../../../services/orders';

const MyPurchasesPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedOrderForQr, setSelectedOrderForQr] = useState<OrderWithItems | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('No estás autenticado');
        setLoading(false);
        return;
      }

      const userOrders = await getUserOrders(user.id);
      setOrders(userOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#99cb36';
      case 'pending':
        return '#FFB800';
      case 'failed':
        return '#E31E24';
      case 'refunded':
        return '#8692A6';
      default:
        return '#8692A6';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pagado';
      case 'pending':
        return 'Pendiente';
      case 'failed':
        return 'Fallido';
      case 'refunded':
        return 'Reembolsado';
      default:
        return status;
    }
  };

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

  const handleViewDetails = (orderId: number) => {
    navigate(`/purchase-success/${orderId}`);
  };

  const handleViewQr = (order: OrderWithItems) => {
    setSelectedOrderForQr(order);
    setQrModalOpen(true);
  };

  const handleCloseQrModal = () => {
    setQrModalOpen(false);
    setSelectedOrderForQr(null);
  };

  return (
    <div className="my-purchases-page">
      <Header />
      <div className="purchases-container">
        <h1 className="purchases-title">Mis Compras</h1>

        {loading ? (
          <div className="purchases-loading">
            <CircularProgress sx={{ color: '#99cb36' }} />
            <p>Cargando compras...</p>
          </div>
        ) : error ? (
          <div className="purchases-error">
            <p>{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="purchases-empty">
            <p>No tienes compras aún 🛒</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3 className="order-number">Orden #{order.order_number}</h3>
                    <p className="order-date">{formatDate(order.created_at)}</p>
                  </div>
                  <div className="order-header-right">
                    <div 
                      className="order-status"
                      style={{ 
                        backgroundColor: getStatusColor(order.payment_status),
                        color: '#fff',
                      }}
                    >
                      {getStatusLabel(order.payment_status)}
                    </div>
                  </div>
                </div>

                <div className="order-items">
                  {order.order_items && order.order_items.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="order-item-info">
                        <p className="order-item-name">{item.item_name}</p>
                        <p className="order-item-details">
                          Cantidad: {item.quantity} × {formatCurrency(item.unit_price)}
                        </p>
                      </div>
                      <p className="order-item-total">{formatCurrency(item.total_price)}</p>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="order-summary-row">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="order-summary-row discount">
                      <span>Descuento:</span>
                      <span>- {formatCurrency(order.discount)}</span>
                    </div>
                  )}
                  <div className="order-summary-row total">
                    <span>Total:</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="order-actions">
                  <button 
                    className="view-details-btn"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    Ver detalles
                  </button>
                  {order.order_items.some(item => item.item_type === 'event') && (
                    <button 
                      className="view-qr-btn"
                      onClick={() => handleViewQr(order)}
                    >
                      <QrCodeIcon />
                      Ver QR
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        open={qrModalOpen}
        onClose={handleCloseQrModal}
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }
        }}
      >
        <Box className="qr-modal">
          <div className="qr-modal-header">
            <h2 className="qr-modal-title">Tu código QR</h2>
            <IconButton onClick={handleCloseQrModal} sx={{ color: '#FFFFFF' }}>
              <CloseIcon />
            </IconButton>
          </div>
          
          <div className="qr-modal-content">
            {selectedOrderForQr && (
              <>
                <QRCodeSVG
                  value={selectedOrderForQr.order_number}
                  size={250}
                  level="H"
                  includeMargin={true}
                  fgColor="#000000"
                  bgColor="#FFFFFF"
                />
                <p className="qr-modal-label">Muestra este código QR en la entrada del evento</p>
                <p className="qr-modal-order-number">Orden: {selectedOrderForQr.order_number}</p>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MyPurchasesPage;
