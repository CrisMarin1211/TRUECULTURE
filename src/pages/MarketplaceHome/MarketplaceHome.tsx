// import MarketplaceContainer from '../../components/marketplacesComponents/MarketplaceContainer/MarketplaceContainer';
// const MarketplaceHome = () => {
//   return (
//     <div className="marketplace-page">
//       <MarketplaceContainer />
//     </div>
//   );
// };

// export default MarketplaceHome;

import Header from '../../components/header/index';
import FeaturesProductList from '../../components/List/Featured/featuredProductList/index';
import ProductList from '../../components/List/categories/productList/index';

const TAGS = ['Afiches', 'Pines', 'Cultural', 'Moda', 'Gastronomía'];

const MarketplaceHome: React.FC = () => {
  return (
    <>
      <Header />
      <div>
        <FeaturesProductList />
      </div>
      {TAGS.map((tag) => (
        <ProductList key={tag} tag={tag as any} />
      ))}
    </>
  );
};
export default MarketplaceHome;
