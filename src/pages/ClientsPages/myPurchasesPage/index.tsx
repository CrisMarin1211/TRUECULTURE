import { useState, useEffect, lazy, Suspense } from 'react';
import ColoredText from '../../../components/coloredText';
import Header from '../../../components/header';
import './style.css';
import EventCard from '../../../components/eventCard';

const PurchaseDetailModal = lazy(() => import('../../../components/purchaseDetailModal'));

const MyPurchasesPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [purchases, setPurchases] = useState<any[]>([]);

  useEffect(() => {
    const savedPurchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    setPurchases(savedPurchases);
  }, []);

  return (
    <div className="my-purchases-page">
      <Header />
      <ColoredText text="Mis compras " color="#FF0099" />

      <div className="purchases-grid">
        {purchases.length ? (
          purchases.map((product, index) => (
            <EventCard
              key={product.id ?? index}
              description={product.description}
              title={product.title}
              image={product.image}
              type={product.type}
              date={product.date}
              onViewQR={() => setSelectedProduct(product)}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#777' }}>No tienes compras aún 🛒</p>
        )}
      </div>

      {selectedProduct && (
        <Suspense fallback={<div style={{ color: 'white' }}>Cargando detalle...</div>}>
          <PurchaseDetailModal {...selectedProduct} onClose={() => setSelectedProduct(null)} />
        </Suspense>
      )}
    </div>
  );
};

export default MyPurchasesPage;
