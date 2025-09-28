import React, { useContext } from 'react';
import { useProduct } from '../../../../context/ProductEvent';
import CardClient from '../../../atomsUi/productCard-Client';
import { CityContext } from '../../../../context/cityContex';
import type { ProductItem } from '../../../../types/ProductType';

interface ProductListProps {
  tag: ProductItem['tags'];
}

const ProductList: React.FC<ProductListProps> = ({ tag }) => {
  const { products = [] } = useProduct();
  const { city } = useContext(CityContext);

  const filtered: ProductItem[] = products.filter(
    (e: ProductItem) => e.tags === tag && e.city === city,
  );

  if (!filtered.length) return null;

  return (
    <section>
      <h2>{tag}</h2>
      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
        {filtered.map((item: ProductItem) => (
          <CardClient key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
