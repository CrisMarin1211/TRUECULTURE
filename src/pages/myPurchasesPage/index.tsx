import { useState } from 'react';
import ColoredText from '../../components/coloredText';
import Header from '../../components/header';
import './style.css';
import { products } from '../../data/data';
import EventCard from '../../components/eventCard';
import PurchaseDetailModal from '../../components/purchaseDetailModal';

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
        <PurchaseDetailModal
          image={selectedProduct.image}
          title={selectedProduct.title}
          text={selectedProduct.description}
          location={selectedProduct.location}
          date={selectedProduct.date}
          name={selectedProduct.name}
          time={selectedProduct.time}
          barcodeImage={selectedProduct.barcodeImage}
          barcodeCode={selectedProduct.barcodeCode}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default MyPurchasesPage;
