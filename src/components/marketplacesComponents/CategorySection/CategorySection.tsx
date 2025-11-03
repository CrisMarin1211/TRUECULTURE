import React from 'react';
import CardClient from '../../atomsUi/EventCard-Client/CardClient';
import type { ProductItem } from '../../../types/ProductType';

import './CategorySection.css';

interface CategorySectionProps {
  title: string;
  products: ProductItem[];
  onViewMore?: () => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, products, onViewMore }) => {
  return (
    <div className="category-section">
      <div className="category-section-header">
        <h2>{title}</h2>
        {onViewMore && (
          <button className="view-more" onClick={onViewMore}>
            Ver más
          </button>
        )}
      </div>

      <div className="category-cards">
        {products.map((product) => (
          <CardClient key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
