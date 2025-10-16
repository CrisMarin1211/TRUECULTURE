import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContex';
import './style.css';

const formatCurrency = (value: number) =>
  value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

const CheckoutSummary = () => {
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const { subtotal, discount, total, setDiscount, finalizePurchase } = useCart();

  const handleApply = () => {
    if (couponCode.trim() !== '') {
      setDiscount(couponCode.trim().toUpperCase() === 'DESCUENTO10' ? subtotal * 0.1 : 0);
    }
  };

  const handleCheckout = () => {
    const success = finalizePurchase();
    if (success) {
      navigate('/mis-compras');
    } else {
      alert('No hay productos en el carrito');
    }
  };

  return (
    <div className="checkout-summary">
      <div className="row">
        <span className="label">Subtotal:</span>
        <span className="value">{formatCurrency(subtotal)}</span>
      </div>

      {discount > 0 && (
        <div className="row">
          <span className="label">Cupón:</span>
          <span className="value coupon-value">- {formatCurrency(discount)}</span>
        </div>
      )}

      <div className="row total-row">
        <span className="label">Total:</span>
        <span className="value total-value">{formatCurrency(total)}</span>
      </div>

      <div className="add-coupon">
        <input
          type="text"
          placeholder="Código de cupón"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button onClick={handleApply}>Aplicar</button>
      </div>

      <button className="checkout-btn" onClick={handleCheckout}>
        Finalizar compra
      </button>
    </div>
  );
};

export default CheckoutSummary;
