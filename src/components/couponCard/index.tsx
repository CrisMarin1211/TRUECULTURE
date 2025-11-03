import './style.css';

type CouponCardProps = {
  title: string;
  description: string;
  code: string;
};

const CouponCard = ({ title, description, code }: CouponCardProps) => {
  return (
    <div className="coupon-card">
      <div className="coupon-info">
        <h3 className="coupon-title">{title}</h3>
        <p className="coupon-description">{description}</p>
        <span className="coupon-value">{code}</span>
      </div>
      <button className="redeem-btn">Redimir Cupon</button>
    </div>
  );
};

export default CouponCard;
