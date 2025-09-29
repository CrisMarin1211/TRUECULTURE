import React, { useContext, useState } from 'react';
import { useProduct } from '../../../../context/ProductEvent';
import CardClient from '../../../atomsUi/EventCard-Client/CardClient';
import { CityContext } from '../../../../context/cityContex';
import type { ProductItem } from '../../../../types/ProductType';
import { Dialog, Typography, Box } from '@mui/material';
import ViewMore from '../../../viewMore/veiwMore';
import { useNavigate } from 'react-router-dom';

interface ProductListProps {
  tag: ProductItem['tags'];
}

const ProductList: React.FC<ProductListProps> = ({ tag }) => {
  const { products = [] } = useProduct();
  const { city } = useContext(CityContext);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const navigate = useNavigate();

  const filtered: ProductItem[] = products.filter(
    (product: ProductItem) => product.tags === tag && product.city === city,
  );
  if (!filtered.length) return null;

  return (
    <section style={{ marginBottom: '2rem' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          width: '100%',
          maxWidth: '1200px',
          marginX: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            fontSize: '30px',
            fontFamily: "'Satoshi', sans-serif",
          }}
        >
          {tag}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            cursor: 'pointer',
            color: 'primary.main',
            fontWeight: 600,
          }}
          onClick={() => navigate(`/categories/${city}/${tag}`)}
        >
          Ver más
        </Typography>
      </Box>

      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '0 1rem' }}>
        {filtered.map((item: ProductItem) => (
          <CardClient
            key={item.id}
            item={item}
            onViewMore={(product) => setSelectedProduct(product as ProductItem)}
          />
        ))}
      </div>

      <Dialog
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        fullWidth
        maxWidth="md"
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        }}
      >
        {selectedProduct && (
          <ViewMore item={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </Dialog>
    </section>
  );
};

export default ProductList;
