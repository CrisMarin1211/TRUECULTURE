import Header from '../../header';
import CategorySection from '../CategorySection/CategorySection';
// import FeaturedCard from '../../atomsUi/featuredCard/index';
import CardClient from '../../atomsUi/EventCard-Client/CardClient';

import { mockProducts } from '../../../data/mockProducts';

const MarketplaceHomeContainer = () => {
  // const featured = mockProducts.slice(0, 3);

  return (
    <div className="marketplace-home">
      <Header />

      <section className="categories-section">
        <h2>Categorías</h2>

        <CategorySection
          title="Artesanías"
          products={mockProducts.filter((p) => p.tags.toLowerCase() === 'cultural')}
          onViewMore={() => console.log('Ir a Artesanías')}
        />

        <CategorySection
          title="Carteles | Afiches"
          products={mockProducts.filter((p) => p.tags.toLowerCase() === 'afiches')}
          onViewMore={() => console.log('Ir a Carteles')}
        />
      </section>

      {/* <section className="featured-section">
        <h2>Destacados</h2>
        <div className="featured-grid">
          {featured.map((item) => (
            <FeaturedCard key={item.id} item={item} />
          ))}
        </div>
      </section> */}

      {/* Listado de productos */}
      <section className="products-section">
        <h2>Todos los productos</h2>
        <div className="products-grid">
          {mockProducts.map((item) => (
            <CardClient key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MarketplaceHomeContainer;
