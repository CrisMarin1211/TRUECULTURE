import ColoredText from '../../components/coloredText';
import { CurrentLocation } from '../../components/currentLocation';
import Header from '../../components/header';
import './style.css';
import { products } from '../../data/data';
import EventCard from '../../components/eventCard';

const MyPurchasesPage = () => {
  return (
    <div className="my-purchases-page">
      <Header />
      <CurrentLocation city="Cali, Colombia" />
      <ColoredText text="Mi Carrito " color="#FF0099" />
      <div className="coupons-grid">
        {products.map((product, index) => (
          <EventCard
            key={index}
            title={coupon.title}
            image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
            date="12 de Diciembre, 2023"
          />
        ))}
      </div>
    </div>
  );
};

export default MyPurchasesPage;
