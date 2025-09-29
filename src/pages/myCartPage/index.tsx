import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ColoredText from '../../components/coloredText';
import Header from '../../components/header';
import './style.css';
import { products as initialProducts, coupons } from '../../data/data';
import ProductCard from '../../components/productCard';
import CheckoutSummary from '../../components/checkoutSummary';

const MyCartPage = () => {
  const location = useLocation();
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [cartProducts, setCartProducts] = useState(initialProducts);
  const [quantities, setQuantities] = useState<number[]>(initialProducts.map(() => 1));

  // Agregar item enviado desde ViewMore al carrito
  useEffect(() => {
    if (location.state?.item) {
      setCartProducts((prev) => [...prev, location.state.item]);
      setQuantities((prev) => [...prev, 1]);
    }
  }, [location.state]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    setQuantities((prev) => prev.map((q, i) => (i === index ? newQuantity : q)));
  };

  const subtotal = cartProducts.reduce(
    (acc, product, index) => acc + product.price * quantities[index],
    0,
  );

  const discount = appliedCoupon
    ? (() => {
        const coupon = coupons.find((c) => c.code === appliedCoupon);
        if (!coupon) return 0;
        if (coupon.type === 'percent') return Math.round((subtotal * coupon.value) / 100);
        if (coupon.type === 'fixed') return coupon.value;
        return 0;
      })()
    : 0;

  const total = Math.max(subtotal - discount, 0);

  return (
    <>
      <Header />
      <div className="my-cart-page">
        <ColoredText text="Mi Carrito" color="#99CB36" />

        <div className="cart-content">
          <div className="products-column">
            {cartProducts.map((product, index) => (
              <ProductCard
                key={index}
                title={(product as any).title || (product as any).name} // si viene de ViewMore usa name
                image={product.image}
                price={product.price}
                quantity={quantities[index]}
                onQuantityChange={(q) => handleQuantityChange(index, q)}
              />
            ))}
          </div>

          <div className="checkout-column">
            <CheckoutSummary
              subtotal={subtotal}
              discount={discount}
              total={total}
              onApplyCoupon={setAppliedCoupon}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCartPage;
