import './style.css';

type AdminProductCardProps = {
  image: string;
  name: string;
  price: string;
  stock: number;
  other: string;
  location: string;
  status: string;
};

const AdminProductCard = ({
  image,
  name,
  price,
  stock,
  other,
  location,
  status,
}: AdminProductCardProps) => {
  return (
    <div className="product-card admin">
      <div className="product-img-wrapper">
        <img src={image} alt={name} className="product-img" />
      </div>

      <h3 className="admin-product-name">{name}</h3>

      <div className="product-info-row">
        <div className="product-info-item">
          <span className="label">Precio</span>
          <span className="value">{price}</span>
        </div>
        <div className="product-info-item">
          <span className="label">Stock</span>
          <span className="value">{stock}</span>
        </div>
        <div className="product-info-item">
          <span className="label">Otro</span>
          <span className="value">{other}</span>
        </div>
      </div>

      <hr className="divider" />

      <div className="product-bottom">
        <div className="product-info-item">
          <span className="label">Lugar</span>
          <span className="value">{location}</span>
        </div>
        <div className="product-info-item">
          <span className="label">Estado</span>
          <span className="value">{status}</span>
        </div>
      </div>

      <div className="product-footer">
        <button className="btn-view">Ver</button>
      </div>
    </div>
  );
};

export default AdminProductCard;
