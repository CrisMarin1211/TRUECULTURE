import { useState } from 'react';
import ColoredText from '../../components/coloredText';
import Header from '../../components/header';
import './style.css';
import { products, coupons } from '../../data/data';
import ProductCard from '../../components/productCard';
import CheckoutSummary from '../../components/checkoutSummary';

const MyCartPage = () => {
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<number[]>(products.map(() => 1));

  const handleQuantityChange = (index: number, newQuantity: number) => {
    setQuantities((prev) => prev.map((q, i) => (i === index ? newQuantity : q)));
  };

  const subtotal = products.reduce(
    (acc, product, index) => acc + product.price * quantities[index],
    0,
  );

  const discount = appliedCoupon
    ? (() => {
        const coupon = coupons.find((c) => c.code === appliedCoupon);
        if (!coupon) return 0;
        if (coupon.type === 'percent') {
          return Math.round((subtotal * coupon.value) / 100);
        }
        if (coupon.type === 'fixed') {
          return coupon.value;
        }
        return 0;
      })()
    : 0;

  const total = Math.max(subtotal - discount, 0);

  return (
    <div className="my-cart-page">
      <Header />
      <ColoredText text="Mi Carrito" color="#99CB36" />

      <div className="coupons-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            description={product.description}
            image={product.image}
            price={product.price}
            quantity={quantities[index]}
            onQuantityChange={(q) => handleQuantityChange(index, q)}
          />
        ))}
      </div>

      <div className="checkout-wrapper">
        <CheckoutSummary
          subtotal={subtotal}
          discount={discount}
          total={total}
          onApplyCoupon={setAppliedCoupon}
        />
      </div>
    </div>
  );
};

export default MyCartPage;
