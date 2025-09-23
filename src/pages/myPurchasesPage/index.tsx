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
            description={product.description}
            title={product.title}
            image={product.image}
            type={product.type}
            date={product.date}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPurchasesPage;
