import { useNavigate } from 'react-router-dom';
import './style.css';
import type { ProductItem } from '../../types/ProductType';

interface AdminProductCardProps {
  product: ProductItem;
}

const AdminProductCard = ({ product }: AdminProductCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="product-card admin">
      <div className="product-img-wrapper">
        <img
          src={product.image || '/placeholder.jpg'}
          alt={product.name}
          className="product-img"
          onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
        />
      </div>

      <h3 className="admin-product-name">{product.name}</h3>

      <div className="product-info-row">
        <div className="product-info-item">
          <span className="label">Precio</span>
          <span className="value">${product.price}</span>
        </div>
        <div className="product-info-item">
          <span className="label">Stock</span>
          <span className="value">{product.totalstock}</span>
        </div>
        <div className="product-info-item">
          <span className="label">Popularidad</span>
          <span className="value">{product.popularity}</span>
        </div>
      </div>

      <hr className="divider" />

      <div className="product-bottom">
        <div className="product-info-item">
          <span className="label">Ubicación</span>
          <span className="value">{product.location}</span>
        </div>
        <div className="product-info-item">
          <span className="label">Estado</span>
          <span className={value status-${product.status.toLowerCase().replace(' ', '-')}}>
            {product.status}
          </span>
        </div>
      </div>

      <div className="product-footer">
        <button className="btn-view" onClick={() => navigate(/edit-product/${product.id})}>
          Editar
        </button>
      </div>
    </div>
  );
};

export default AdminProductCard;