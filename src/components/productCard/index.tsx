import { useState } from 'react';
import './style.css';

type ProductCardProps = {
  image: string;
  title: string;
  description: string;
  price: string;
};

const ProductCard = ({ image, title, description, price }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [activeButton, setActiveButton] = useState<'plus' | 'minus' | null>(null);

  const handleMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={title} />
      </div>

      <div className="product-info">
        <div className="product-header">
          <h3 className="product-title">{title}</h3>
        </div>

        <p className="product-description">{description}</p>

        <div className="product-footer">
          <span className="product-price">{price}</span>

          <div className="product-actions">
            <button
              className={`circle-btn ${activeButton === 'minus' ? 'active' : ''}`}
              onClick={() => {
                setActiveButton('minus');
                handleMinus();
              }}
              onMouseEnter={() => setActiveButton('minus')}
              onMouseLeave={() => setActiveButton(null)}
            >
              -
            </button>

            <span className="quantity">{quantity}</span>

            <button
              className={`circle-btn ${activeButton === 'plus' ? 'active' : ''}`}
              onClick={() => {
                setActiveButton('plus');
                handlePlus();
              }}
              onMouseEnter={() => setActiveButton('plus')}
              onMouseLeave={() => setActiveButton(null)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
