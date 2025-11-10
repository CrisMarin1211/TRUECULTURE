import './style.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type ProductCardProps = {
  image: string;
  title: string;
  price: number;
  quantity: number;
  value?: number;
  seats?: string[];
  onQuantityChange: (newQuantity: number) => void;
  onRemove?: () => void;
  onEditSeats?: () => void;
};

const ProductCard = ({ 
  image, 
  title, 
  price, 
  quantity, 
  seats, 
  onQuantityChange,
  onRemove,
  onEditSeats
}: ProductCardProps) => {
  const handleMinus = () => {
    onQuantityChange(quantity - 1);
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
          {seats && seats.length > 0 && (
            <div className="product-seats">
              <span className="seats-label">Asientos:</span>
              <span className="seats-value">{seats.join(', ')}</span>
            </div>
          )}
        </div>

        <div className="product-footer">
          <span className="product-price">${price}</span>

          <div className="product-actions-group">
            <div className="product-actions">
              <button className="circle-btn" onClick={handleMinus} disabled={seats && seats.length > 0}>
                -
              </button>

              <span className="quantity">{quantity}</span>

              <button className="circle-btn" onClick={handlePlus} disabled={seats && seats.length > 0}>
                +
              </button>
            </div>

            {seats && seats.length > 0 && onEditSeats && (
              <button className="edit-seats-btn" onClick={onEditSeats} title="Editar asientos">
                <EditIcon />
              </button>
            )}

            {onRemove && (
              <button className="delete-btn" onClick={onRemove} title="Eliminar">
                <DeleteIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
