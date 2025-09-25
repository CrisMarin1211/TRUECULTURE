import './style.css';

const CheckoutSummary = () => {
  return (
    <div className="checkout-summary">
      <div className="row">
        <span className="label first-row">Cupón:</span>
        <span className="value coupon-value first-row">- $15.000</span>
      </div>

      <div className="row">
        <span className="label">Total:</span>
        <span className="value total-value">$45.000</span>
      </div>

      <div className="add-coupon">Adicionar cupón</div>

      <button className="checkout-btn">Finalizar compra</button>
    </div>
  );
};

export default CheckoutSummary;
