import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ColoredText from '../../../components/coloredText';
import Header from '../../../components/header';
import './style.css';
import { coupons } from '../../../data/data';
import ProductCard from '../../../components/productCard';
import CheckoutSummary from '../../../components/checkoutSummary';

const MyCartPage = () => {
  const location = useLocation();
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    let loadedProducts: any[] = [];
    let loadedQuantities: number[] = [];

    if (storedCart) {
      const parsed = JSON.parse(storedCart);
      loadedProducts = parsed.products || [];
      loadedQuantities = parsed.quantities || [];

      const fixedQuantities = loadedProducts.map((_, i) => loadedQuantities[i] ?? 1);
      setCartProducts(loadedProducts);
      setQuantities(fixedQuantities);
    }

    const newItem = location.state?.item;
    if (newItem) {
      setCartProducts((prevProducts) => {
        const exists = prevProducts.some((p) => p.id === newItem.id);
        if (exists) return prevProducts;

        const updatedProducts = [...prevProducts, newItem];
        const updatedQuantities = [...(quantities.length ? quantities : loadedQuantities), 1];

        localStorage.setItem(
          'cart',
          JSON.stringify({ products: updatedProducts, quantities: updatedQuantities }),
        );

        setQuantities(updatedQuantities);
        return updatedProducts;
      });
    }
  }, [location.state]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    setQuantities((prev) => {
      const updated = prev.map((q, i) => (i === index ? newQuantity : q));

      localStorage.setItem('cart', JSON.stringify({ products: cartProducts, quantities: updated }));

      return updated;
    });
  };

  useEffect(() => {
    if (cartProducts.length) {
      localStorage.setItem('cart', JSON.stringify({ products: cartProducts, quantities }));
    }
  }, [cartProducts, quantities]);

  const subtotal = cartProducts.reduce((acc, product, index) => {
    const price = Number(product.price) || 0;
    const quantity = Number(quantities[index]) || 1;
    return acc + price * quantity;
  }, 0);

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
            {cartProducts.length ? (
              cartProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  title={(product as any).title || (product as any).name}
                  image={product.image}
                  price={product.price}
                  quantity={quantities[index] ?? 1}
                  onQuantityChange={(q) => handleQuantityChange(index, q)}
                />
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#777' }}>Tu carrito está vacío 🛒</p>
            )}
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
