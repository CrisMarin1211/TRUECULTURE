import { useState } from 'react';
import './style.css';

type Props = {
  subtotal: number;
  discount: number;
  total: number;
  onApplyCoupon: (code: string) => void;
};

const formatCurrency = (value: number) =>
  value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

const CheckoutSummary = ({ subtotal, discount, total, onApplyCoupon }: Props) => {
  const [couponCode, setCouponCode] = useState('');

  const handleApply = () => {
    if (couponCode.trim() !== '') {
      onApplyCoupon(couponCode.trim().toUpperCase());
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

      <button className="checkout-btn">Finalizar compra</button>
    </div>
  );
};

export default CheckoutSummary;
