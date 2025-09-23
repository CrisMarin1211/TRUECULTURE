import './style.css';

type CouponCardProps = {
  title: string;
  description: string;
  value: string;
};

const CouponCard = ({ title, description, value, code }: CouponCardProps) => {
  return (
    <div className="coupon-card">
      <div className="coupon-info">
        <h3 className="coupon-title">{title}</h3>
        <p className="coupon-description">{description}</p>
        <span className="coupon-value">{value}</span>
      </div>
      <button className="redeem-btn">Redimir Cupon</button>
    </div>
  );
};

export default CouponCard;
