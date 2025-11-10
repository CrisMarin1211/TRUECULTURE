import './style.css';

type CouponCardProps = {
  title?: string | null;
  description?: string;
  code: string;
  discount?: number;
  discountType?: 'percent' | 'fixed';
  isUsed?: boolean;
  isExpired?: boolean;
  usedAt?: string | null;
  expiresAt?: string | null;
  onRedeem?: () => void;
};

const CouponCard = ({ 
  title, 
  code, 
  discount,
  discountType,
  isUsed = false,
  isExpired = false,
  usedAt,
  expiresAt
}: CouponCardProps) => {
  const getDiscountText = () => {
    if (!discount || !discountType) return '';
    if (discountType === 'percent') {
      return `${discount}% de descuento`;
    }
    return `$${discount.toLocaleString('es-CO')} de descuento`;
  };

  const getStatusClass = () => {
    if (isUsed) return 'used';
    if (isExpired) return 'expired';
    return 'active';
  };

  const getStatusText = () => {
    if (isUsed) return 'Usado';
    if (isExpired) return 'Expirado';
    return 'Disponible';
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className={`coupon-card ${getStatusClass()}`}>
      {/* Discount Badge */}
      {discount && (
        <div className="coupon-discount-badge">
          <span className="discount-value">
            {discountType === 'percent' ? `${discount}%` : `$${discount.toLocaleString('es-CO')}`}
          </span>
          <span className="discount-label">OFF</span>
        </div>
      )}

      <div className="coupon-content">
        <div className="coupon-header">
          {title && <h3 className="coupon-title">{title}</h3>}
          {!title && discount && <h3 className="coupon-title">{getDiscountText()}</h3>}
        </div>

        <div className="coupon-code-section">
          <span className="code-label">Código:</span>
          <span className="coupon-value">{code}</span>
        </div>

        <div className="coupon-footer">
          {!isUsed && (
            <div className="coupon-status">
              <span className={`status-badge ${getStatusClass()}`}>{getStatusText()}</span>
            </div>
          )}
          {(usedAt || expiresAt) && (
            <div className="coupon-dates">
              {usedAt && (
                <span className="coupon-date">Usado el {formatDate(usedAt)}</span>
              )}
              {expiresAt && !isUsed && (
                <span className="coupon-date">Expira el {formatDate(expiresAt)}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
