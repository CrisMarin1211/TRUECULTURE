import Header from '../../../components/header';
import FeaturedProductList from '../../../components/List/Featured/featuredProductList/index';
import ProductList from '../../../components/List/categories/productList/index';
import { Box } from '@mui/material';
import CurrentLocation from '../../../components/atomsUi/currentLocation';

const TAGS = ['Afiches', 'Pines', 'Artesanías', 'Moda', 'Gastronomía'];

const MarketplaceHome: React.FC = () => {
  return (
    <>
      <Header />

      <Box
        sx={{
          px: 2,
          mt: 2,
          display: 'flex',
          justifyContent: { xs: 'flex-start', md: 'center' },
          alignItems: 'center',
        }}
      >
        <CurrentLocation />
      </Box>

      <Box
        sx={{
          mt: 5,
          maxWidth: { md: 1000 },
          mx: { md: 'auto' },
        }}
      >
        <Box
          sx={{
            mb: 10,
            maxWidth: { md: 1000 },
          }}
        >
          <FeaturedProductList />
        </Box>

        {TAGS.map((tag) => (
          <Box
            key={tag}
            sx={{
              mb: 10,
              maxWidth: { md: 1100 },
              mx: { md: 'auto' },
            }}
          >
            <ProductList tag={tag as any} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MarketplaceHome;
