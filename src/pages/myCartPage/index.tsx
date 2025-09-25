import ColoredText from '../../components/coloredText';
import CurrentLocation from '../../components/currentLocation';
import Header from '../../components/header';
import './style.css';
import { coupons } from '../../data/data';
import ProductCard from '../../components/productCard';
import CheckoutSummary from '../../components/checkoutSummary';

const MyCartPage = () => {
  return (
    <div className="my-cart-page">
      <Header />
      <CurrentLocation city="Cali, Colombia" />
      <ColoredText text="Mi Carrito " color="#99CB36" />

      <div className="coupons-grid">
        {coupons.map((coupon, index) => (
          <ProductCard
            key={index}
            title={coupon.title}
            description={coupon.description}
            image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
            price="$19.99"
          />
        ))}
      </div>

      <div className="checkout-wrapper">
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default MyCartPage;
