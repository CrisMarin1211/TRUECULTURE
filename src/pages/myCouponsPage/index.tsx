import ColoredText from '../../components/coloredText';
import Header from '../../components/header';
import CouponCard from '../../components/couponCard';
import './style.css';
import { coupons } from '../../data/data';

const MyCouponsPage = () => {
  return (
    <div className="my-coupons-page">
      <Header />
      <ColoredText text="Mis cupones" color="#FF0099" />
      <div className="coupons-grid">
        {coupons.map((coupon, index) => (
          <CouponCard
            key={index}
            title={coupon.title}
            description={coupon.description}
            code={coupon.code}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCouponsPage;
