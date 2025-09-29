import Header from '../../components/header';
import FeaturedProductList from '../../components/List/Featured/featuredProductList/index';
import ProductList from '../../components/List/categories/productList/index';

const TAGS = ['Afiches', 'Pines', 'Cultural', 'Moda', 'Gastronomía'];

const MarketplaceHome: React.FC = () => {
  return (
    <>
      <Header />
      <div>
        <FeaturedProductList />
      </div>
      {TAGS.map((tag) => (
        <ProductList key={tag} tag={tag as any} />
      ))}
    </>
  );
};
export default MarketplaceHome;
