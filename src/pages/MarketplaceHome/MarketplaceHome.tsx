import Header from '../../components/header';
import FeaturedProductList from '../../components/List/Featured/featuredProductList/index';
import ProductList from '../../components/List/categories/productList/index';
import { Box } from '@mui/material';

const TAGS = ['Afiches', 'Pines', 'Cultural', 'Moda', 'Gastronomía'];

const MarketplaceHome: React.FC = () => {
  return (
    <>
      <Header />
      <Box sx={{ px: 2, mt: 5 }}>
        <Box sx={{ mb: 10 }}>
          <FeaturedProductList />
        </Box>

        {TAGS.map((tag) => (
          <Box key={tag} sx={{ mb: 10 }}>
            <ProductList tag={tag as any} />
          </Box>
        ))}
      </Box>
    </>
  );
};
export default MarketplaceHome;
