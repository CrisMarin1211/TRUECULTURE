import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContex';
import { getUserCoupons, calculateCouponDiscount } from '../../services/coupons';
import { supabase } from '../../lib/supabaseClient';
import type { UserCouponWithDetails } from '../../services/coupons';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import theme from '../../styles/theme';
import './style.css';

interface CheckoutSummaryProps {
  subtotal?: number;
  discount?: number;
  total?: number;
  onApplyCoupon?: (code: string | null) => void;
}

const formatCurrency = (value: number) =>
  value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

const CheckoutSummary = ({}: CheckoutSummaryProps) => {
  const [userCoupons, setUserCoupons] = useState<UserCouponWithDetails[]>([]);
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const { cartItems, subtotal, discount, total, setDiscount } = useCart();

  useEffect(() => {
    const fetchUserCoupons = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const coupons = await getUserCoupons(user.id);
        setUserCoupons(coupons);
      }
      setLoading(false);
    };

    fetchUserCoupons();
  }, []);

  useEffect(() => {
    if (selectedCouponId && userCoupons.length > 0) {
      const selectedCoupon = userCoupons.find(uc => uc.id === selectedCouponId);
      if (selectedCoupon) {
        const calculatedDiscount = calculateCouponDiscount(selectedCoupon.coupons, subtotal);
        setDiscount(calculatedDiscount);
      }
    } else {
      setDiscount(0);
    }
  }, [selectedCouponId, subtotal]);

  const handleCheckout = () => {
    if (!agreedToTerms) {
      setSnackbarMessage('Debes aceptar los términos y condiciones');
      setSnackbarOpen(true);
      return;
    }

    if (cartItems.length === 0) {
      setSnackbarMessage('No hay productos en el carrito');
      setSnackbarOpen(true);
      return;
    }

    if (selectedCouponId) {
      localStorage.setItem('selectedCouponId', selectedCouponId.toString());
    }

    navigate('/checkout');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSelectCoupon = (couponId: number | null) => {
    setSelectedCouponId(couponId);
    setIsSidebarOpen(false);
  };

  const selectedCoupon = userCoupons.find(uc => uc.id === selectedCouponId);

  return (
    <>
      <div className="checkout-summary">
        <div className="row">
          <span className="label">Subtotal:</span>
          <span className="value">{formatCurrency(subtotal)}</span>
        </div>

        {discount > 0 && selectedCoupon && (
          <div className="row">
            <span className="label">Cupón ({selectedCoupon.coupons.code}):</span>
            <span className="value coupon-value">- {formatCurrency(discount)}</span>
          </div>
        )}

        <div className="row total-row">
          <span className="label">Total:</span>
          <span className="value total-value">{formatCurrency(total)}</span>
        </div>

        <div className="coupon-section">
          <label className="coupon-label">Cupón de descuento</label>
          <button
            className="add-coupon-btn"
            onClick={() => setIsSidebarOpen(true)}
          >
            Añadir
          </button>
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>
          Tramitar pedido
        </button>

        <div className="terms-section">
          <label className="terms-checkbox">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <span className="terms-text">
              Declaro que estoy de acuerdo con los <a href="/terms" className="terms-link">Términos y condiciones</a> de TrueCulture y/o, en su caso, del vendedor del Marketplace. He leído y acepto la <a href="/privacy" className="terms-link">política de privacidad</a>.
            </span>
          </label>
        </div>

        <div className="benefits-section">
          <div className="benefit-item">
            <EmojiEventsIcon className="benefit-icon" />
            <span className="benefit-text">Gana puntos y obtén descuentos con tu cuenta</span>
          </div>

        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}>
        <div className={`coupon-sidebar ${isSidebarOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="sidebar-header">
            <h2 className="sidebar-title">Añadir cupón de descuento:</h2>
            <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
              <CloseIcon />
            </button>
          </div>

          <div className="sidebar-content">
            {loading ? (
              <div className="coupon-loading">Cargando cupones...</div>
            ) : userCoupons.length === 0 ? (
              <div className="coupon-empty">No tienes cupones disponibles</div>
            ) : (
              <div className="coupon-list">
                <label
                  className="no-coupon-option"
                  onClick={() => handleSelectCoupon(null)}
                >
                  <input
                    type="radio"
                    name="coupon"
                    checked={selectedCouponId === null}
                    onChange={() => handleSelectCoupon(null)}
                  />
                  <div className="custom-radio"></div>
                  <span>No usar cupón</span>
                </label>
                {userCoupons.map((userCoupon) => {
                  const coupon = userCoupon.coupons;
                  const couponDiscount = calculateCouponDiscount(coupon, subtotal);
                  const isDisabled = couponDiscount === 0 && subtotal > 0;

                  return (
                    <label
                      key={userCoupon.id}
                      className={`coupon-option ${isDisabled ? 'disabled' : ''}`}
                      title={isDisabled ? 'No cumple con el monto mínimo de compra' : ''}
                      onClick={() => !isDisabled && handleSelectCoupon(userCoupon.id)}
                    >
                      <input
                        type="radio"
                        name="coupon"
                        checked={selectedCouponId === userCoupon.id}
                        onChange={() => handleSelectCoupon(userCoupon.id)}
                        disabled={isDisabled}
                      />
                      <div className="custom-radio"></div>
                      <div className="coupon-info">
                        <span className="coupon-code">{coupon.code}</span>
                        <span className="coupon-description">{coupon.description}</span>
                        <span className="coupon-discount">
                          {coupon.type === 'percent'
                            ? `${coupon.value}% descuento`
                            : `${formatCurrency(coupon.value)} descuento`
                          }
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
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
    </>
  );
};

export default CheckoutSummary;