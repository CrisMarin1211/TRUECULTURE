import ColoredText from '../../../components/coloredText';
import Header from '../../../components/header';
import './style.css';
import ProductCard from '../../../components/productCard';
import CheckoutSummary from '../../../components/checkoutSummary';
import { useCart } from '../../../context/CartContex';

const MyCartPage = () => {
  const { cartItems, updateQuantity } = useCart();

  return (
    <>
      <Header />
      <div className="my-cart-page">
        <ColoredText text="Mi Carrito" color="#99CB36" />
        <div className="cart-content">
          <div className="products-column">
            {cartItems.length ? (
              cartItems.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  quantity={product.quantity}
                  onQuantityChange={(q) => updateQuantity(product.id, q)}
                />
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#777' }}>Tu carrito está vacío 🛒</p>
            )}
          </div>
          <div className="checkout-column">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCartPage;
