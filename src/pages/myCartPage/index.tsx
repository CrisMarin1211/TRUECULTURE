import ColoredText from '../../components/coloredText';
import CurrentLocation from '../../components/currentLocation';
import Header from '../../components/header';
import './style.css';
import { products } from '../../data/data';
import ProductCard from '../../components/productCard';

const MyCartPage = () => {
  return (
    <div className="my-cart-page">
      <Header />
      <CurrentLocation city="Cali, Colombia" />
      <ColoredText text="Mi Carrito " color="#99CB36" />
      <div className="coupons-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            description={product.description}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCartPage;
