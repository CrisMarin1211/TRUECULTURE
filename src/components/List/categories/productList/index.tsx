import React, { useContext, useState } from 'react';
import { useProduct } from '../../../../context/ProductEvent';
import CardClient from '../../../atomsUi/EventCard-Client/CardClient';
import { CityContext } from '../../../../context/cityContex';
import type { ProductItem } from '../../../../types/ProductType';
import ViewMore from '../../../viewMore/veiwMore';
import { Dialog } from '@mui/material';

interface ProductListProps {
  tag: ProductItem['tags'];
}

const ProductList: React.FC<ProductListProps> = ({ tag }) => {
  const { products = [] } = useProduct();
  const { city } = useContext(CityContext);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const filtered: ProductItem[] = products.filter(
    (e: ProductItem) => e.tags === tag && e.city === city,
  );

  if (!filtered.length) return null;

  return (
    <section>
      <h2>{tag}</h2>
      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
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
