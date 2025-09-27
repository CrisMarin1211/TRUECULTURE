import { useState, lazy, Suspense } from 'react';
import ColoredText from '../../components/coloredText';
import Header from '../../components/header';
import './style.css';
import { products } from '../../data/data';
import EventCard from '../../components/eventCard';

const PurchaseDetailModal = lazy(() => import('../../components/purchaseDetailModal'));

const MyPurchasesPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  return (
    <div className="my-purchases-page">
      <Header />
      <ColoredText text="Mi Carrito " color="#FF0099" />

      <div className="purchases-grid">
        {products.map((product, index) => (
          <EventCard
            key={index}
            description={product.description}
            title={product.title}
            image={product.image}
            type={product.type}
            date={product.date}
            onViewQR={() => setSelectedProduct(product)}
          />
        ))}
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
