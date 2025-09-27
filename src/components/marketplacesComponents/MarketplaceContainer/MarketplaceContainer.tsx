// src/components/marketplaceComponents/MarketplaceHomeContainer.tsx

import header from '../../components/header'; // Asegúrate de tener un Header si es necesario
import CategorySection from './CategorySection/CategorySection';

import Footer from '../globalComponents/Footer/Footer';

import { productsData } from '../../data/productsData'; // la data que ya hicimos

const MarketplaceHomeContainer = () => {
  return (
    <div className="marketplace-home-container">
      {/* 🔝 Navbar */}
      <Header />

      {/* 🔖 Sección de categorías */}
      <section className="categories-section">
        <h2>Categorías</h2>
        <CategorySection />
      </section>

      {/* 🛍️ Carrusel de productos */}
      <section className="products-section">
        <h2>Productos recomendados</h2>
        <ProductCarousel products={productsData} />
      </section>

      {/* 🔚 Footer */}
      <Footer />
    </div>
  );
};

export default MarketplaceHomeContainer;
