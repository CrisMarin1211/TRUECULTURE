import React, { useContext } from 'react';
import { useProduct } from '../../context/ProductEvent';
import CardClient from '../UiAtoms/ProductCard-Client/CardClient';
import type { ProductItem } from '../../types/ProductType';
import { CityContext } from '../../context/CityContex';

const TAGS: ProductItem['tags'][] = ['Afiches', 'Pines', 'Cultural', 'Moda', 'Gastronomía'];

const ProductList: React.FC = () => {
  const { products = [] } = useProduct();
  const { city } = useContext(CityContext);

  return (
    <div>
      {TAGS.map((tag) => {
        const filtered = products.filter((p) => p.tags === tag && p.city === city);
        if (filtered.length === 0) return null;

        return (
          <section key={tag}>
            <h2>{tag}</h2>
            <div>
              {filtered.map((item) => (
                <CardClient key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ProductList;
