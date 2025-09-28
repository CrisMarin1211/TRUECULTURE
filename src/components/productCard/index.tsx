import './style.css';

type ProductCardProps = {
  image: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
};

const ProductCard = ({
  image,
  title,
  description,
  price,
  quantity,
  onQuantityChange,
}: ProductCardProps) => {
  const handleMinus = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  const handlePlus = () => {
    onQuantityChange(quantity + 1);
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
          <span className="product-price">${price}</span>

          <div className="product-actions">
            <button className="circle-btn" onClick={handleMinus}>
              -
            </button>

            <span className="quantity">{quantity}</span>

            <button className="circle-btn" onClick={handlePlus}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
