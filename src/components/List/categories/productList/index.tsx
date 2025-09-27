import React, { useContext } from 'react';
import { useProduct } from '../../../../context/ProductEvent';
import CardClient from '../../../atomsUi/productCard-Client';
import type { ProductItem } from '../../../../types/productType';
import { CityContext } from '../../../../context/CityContex';

const TAGS: ProductItem['tags'][] = ['Afiches', 'Pines', 'Cultural', 'Moda', 'Gastronomía'];

const ProductList: React.FC = () => {
  const { products = [] } = useProduct();
  const { city } = useContext(CityContext);

  // Filtramos primero por ciudad
  const productsByCity = products.filter((product) => product.city === city);

  return (
    <div>
      {TAGS.map((tag) => {
        // Para cada tag, filtramos los productos de esa ciudad
        const filtered = productsByCity.filter((product) => product.tags === tag);
        if (filtered.length === 0) return null;

        return (
          <section key={tag}>
            <h2>{tag}</h2>
            {filtered.map((item) => (
              <CardClient key={item.id} item={item} />
            ))}
          </section>
        );
      })}
    </div>
  );
};

export default ProductList;
