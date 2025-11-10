import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import { useCart } from '../../../context/CartContex';
import { getUserCoupons } from '../../../services/coupons';
import { createOrder } from '../../../services/orders';
import { supabase } from '../../../lib/supabaseClient';
import type { UserCouponWithDetails } from '../../../services/coupons';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import QrCodeIcon from '@mui/icons-material/QrCode';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import theme from '../../../styles/theme';
import './style.css';

const formatCurrency = (value: number) =>
  value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, discount, total, clearCart } = useCart();
  const [selectedCoupon, setSelectedCoupon] = useState<UserCouponWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchCoupons = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const coupons = await getUserCoupons(user.id);
        // Buscar el primer cupón seleccionado del carrito
        const savedCoupon = localStorage.getItem('selectedCouponId');
        if (savedCoupon) {
          const coupon = coupons.find(c => c.id === parseInt(savedCoupon));
          if (coupon) setSelectedCoupon(coupon);
        }
      }
      setLoading(false);
    };

    fetchCoupons();
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/my-cart');
    }
  }, [cartItems]);

  const handleCompletePurchase = async () => {
    if (!paymentMethod) {
      setSnackbarMessage('Por favor selecciona un método de pago');
      setSnackbarOpen(true);
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        setSnackbarMessage('Por favor completa todos los datos de la tarjeta');
        setSnackbarOpen(true);
        return;
      }
    }

    setProcessing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSnackbarMessage('No estás autenticado');
        setSnackbarOpen(true);
        setProcessing(false);
        return;
      }

      const order = await createOrder({
        user_id: user.id,
        items: cartItems.map(item => ({
          type: item.type || 'product',
          id: Number(item.id),
          name: item.title,
          price: item.price,
          quantity: item.quantity,
          seats: item.seats, // Incluir asientos si existen
        })),
        coupon_code: selectedCoupon?.coupons.code,
        payment_status: 'paid',
        shipping_address: undefined,
      });

      if (order) {
        navigate(`/purchase-success/${order.id}`);
        setTimeout(() => {
          clearCart();
          localStorage.removeItem('selectedCouponId');
        }, 100);
      } else {
        setSnackbarMessage('Error al procesar la compra');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error en checkout:', error);
      setSnackbarMessage('Error al procesar la compra');
      setSnackbarOpen(true);
    } finally {
      setProcessing(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <div className="checkout-page">
        <Header />
        <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header />
      <div className="checkout-container">
        <div className="checkout-left">
          <h1 className="checkout-title">Completa tu compra</h1>

          {/* Payment Methods */}
          <div className="payment-section">
            <h2 className="section-title">Método de pago</h2>
            <div className="payment-methods">
              <button
                className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCardIcon className="payment-icon" />
                <span>Tarjeta de crédito/débito</span>
              </button>

              <button
                className={`payment-option ${paymentMethod === 'transfer' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('transfer')}
              >
                <AccountBalanceIcon className="payment-icon" />
                <span>Transferencia bancaria</span>
              </button>

              <button
                className={`payment-option ${paymentMethod === 'qr' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('qr')}
              >
                <QrCodeIcon className="payment-icon" />
                <span>Pago con QR</span>
              </button>
            </div>
          </div>

          {/* Card Details */}
          {paymentMethod === 'card' && (
            <div className="card-details-section">
              <h2 className="section-title">Detalles de la tarjeta</h2>
              <div className="card-form">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="card-input"
                />
                <input
                  type="text"
                  placeholder="Número de tarjeta"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  className="card-input"
                />
                <div className="card-row">
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d{0,2})/, '$1/$2'))}
                    className="card-input card-input-half"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    className="card-input card-input-half"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Transfer or QR Info */}
          {paymentMethod === 'transfer' && (
            <div className="payment-info-section">
              <h2 className="section-title">Información de transferencia</h2>
              <div className="info-box">
                <p><strong>Banco:</strong> Banco de Bogotá</p>
                <p><strong>Cuenta:</strong> 1234567890</p>
                <p><strong>Tipo:</strong> Ahorros</p>
                <p><strong>Titular:</strong> TrueCulture S.A.S</p>
                <p><strong>Referencia:</strong> TC-{Date.now().toString().slice(-6)}</p>
              </div>
              <p className="info-text">
                Realiza la transferencia con la referencia indicada y envíanos el comprobante.
              </p>
            </div>
          )}

          {paymentMethod === 'qr' && (
            <div className="payment-info-section">
              <h2 className="section-title">Escanea el código QR</h2>
              <div className="qr-box">
                <QrCodeIcon sx={{ fontSize: 200, color: '#8692A6' }} />
                <p className="info-text">
                  Escanea el código con tu app bancaria para pagar
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Checkout Summary */}
        <div className="checkout-right">
          <div className="checkout-summary-box">
            <h2 className="summary-title">Resumen de tu pedido</h2>

            <div className="summary-items">
              {cartItems.map((item, index) => (
                <div key={index} className="summary-item">
                  <span className="item-name">{item.title} × {item.quantity}</span>
                  <span className="item-price">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            {discount > 0 && selectedCoupon && (
              <div className="summary-row discount">
                <span>Cupón ({selectedCoupon.coupons.code}):</span>
                <span>- {formatCurrency(discount)}</span>
              </div>
            )}

            <div className="summary-row total">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>

            <button
              className="complete-btn"
              onClick={handleCompletePurchase}
              disabled={processing}
            >
              {processing ? 'Procesando...' : 'Completar compra'}
            </button>

            <div className="benefits-section">
              <div className="benefit-item">
                <EmojiEventsIcon className="benefit-icon" />
                <span className="benefit-text">Gana puntos y obtén descuentos</span>
              </div>
              <div className="benefit-item">
                <LocalShippingIcon className="benefit-icon" />
                <span className="benefit-text">Envío rápido y seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{
            backgroundColor: '#232323',
            color: '#FFFFFF',
            border: `1px solid ${theme.palette.pink.main}`,
            borderRadius: '0.8rem',
            '& .MuiAlert-icon': {
              color: theme.palette.pink.main,
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CheckoutPage;

