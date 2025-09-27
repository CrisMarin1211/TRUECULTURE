import React, { useContext, useEffect, useState } from 'react';
import { useProduct } from '../../../context/ProductEvent';
import FeaturesClient from '../../FeaturedCard/FeaturedCard';
import { CityContext } from '../../../context/CityContex';
import type { ProductItem } from '../../../types/ProductType';

const MAX_CARDS = 5;

const FeaturesProductList: React.FC = () => {
  const { products = [] } = useProduct();
  const { city } = useContext(CityContext);
  const [randomproducts, setRandomProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    const filtered = products.filter(
      (product: ProductItem) => product.city === city && product.popularity === 'Alta demanda',
    );

    const shuffled = filtered.sort(() => 0.5 - Math.random());

    const selected = shuffled.slice(0, MAX_CARDS);

    setRandomProducts(selected);
  }, [city, products]);

  if (randomproducts.length === 0) {
    return <p>No hay eventos destacados en {city}.</p>;
  }

  return (
    <div>
      {randomproducts.map((item) => (
        <FeaturesClient key={item.id} item={item} />
      ))}
    </div>
  );
};

export default FeaturesProductList;
