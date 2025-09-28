import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';

type Product = {
  id: string;
  image: string;
  imageFile: File | null;
  name: string;
  Stock: number;
  Status: string;
  location: string;
  city: string;
  description: string;
  price: number;
  totalStock: number;
  availableStock: number;
  popularity: string;
  tags: string;
  UnitsSaled: number;
  isDraft: boolean;
};

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product>({
    id: crypto.randomUUID(),
    image: '',
    imageFile: null,
    name: '',
    Stock: 0,
    Status: '',
    location: '',
    city: '',
    description: '',
    price: 0,
    totalStock: 0,
    availableStock: 0,
    popularity: '',
    tags: '',
    UnitsSaled: 0,
    isDraft: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem('products');
    if (stored) {
      const products: Product[] = JSON.parse(stored);
      const found = products.find((p) => p.id === id);
      if (found) setProduct(found);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name.toLowerCase().includes('stock') || name === 'UnitsSaled'
          ? Number(value)
          : value,
    }));
  };

  const handleSave = () => {
    const stored = localStorage.getItem('products');
    let products: Product[] = stored ? JSON.parse(stored) : [];
    if (id) {
      products = products.map((p) => (p.id === id ? product : p));
    } else {
      products.push(product);
    }
    localStorage.setItem('products', JSON.stringify(products));
    navigate('/list-products');
  };

  const handleDelete = () => {
    const stored = localStorage.getItem('products');
    if (!stored) return;
    const products: Product[] = JSON.parse(stored);
    const filtered = products.filter((p) => p.id !== product.id);
    localStorage.setItem('products', JSON.stringify(filtered));
    navigate('/list-products');
  };

  return (
    <div className="form-card">
      <div className="row-1">
        <button className="back-btn" onClick={() => navigate('/list-products')}>
          ←
        </button>
        <div className="spacer" />
      </div>

      <div className="row-2">
        <h4 className="title">Detalles del Producto</h4>
        <div className="actions">
          <button className="btn save-btn" onClick={handleSave}>
            Guardar
          </button>
          <button className="btn delete-btn" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </div>

      <div className="row-3">
        <div className="col image-col">
          <label className="input-label" htmlFor="image">
            Imagen (URL)
          </label>
          <input
            id="image"
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </div>

        <div className="col details-col">
          <div className="grid-2">
            <div>
              <label className="input-label" htmlFor="name">
                Nombre del Producto
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="input-label" htmlFor="stock">
                Stock
              </label>
              <input
                id="stock"
                type="number"
                name="Stock"
                value={product.Stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid-2">
            <div>
              <label className="input-label" htmlFor="location">
                Lugar
              </label>
              <input
                id="location"
                type="text"
                name="location"
                value={product.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="input-label" htmlFor="status">
                Estado
              </label>
              <input
                id="status"
                type="text"
                name="Status"
                value={product.Status}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row-4">
        <label className="input-label" htmlFor="description">
          Descripción del evento
        </label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </div>

      <div className="row-5">
        <div>
          <label className="input-label" htmlFor="price">
            Precio
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="input-label" htmlFor="totalStock">
            Stock Total
          </label>
          <input
            id="totalStock"
            type="number"
            name="totalStock"
            value={product.totalStock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="input-label" htmlFor="availableStock">
            Stock Disponible
          </label>
          <input
            id="availableStock"
            type="number"
            name="availableStock"
            value={product.availableStock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="input-label" htmlFor="popularity">
            Nivel de Ventas
          </label>
          <input
            id="popularity"
            type="text"
            name="popularity"
            value={product.popularity}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row-6 grid-2">
        <div>
          <div className="grid-2">
            <div>
              <label className="input-label" htmlFor="tags">
                Tags
              </label>
              <input
                id="tags"
                type="text"
                name="tags"
                value={product.tags}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="input-label" htmlFor="unitsSaled">
                Unidades Vendidas
              </label>
              <input
                id="unitsSaled"
                type="number"
                name="UnitsSaled"
                value={product.UnitsSaled}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="qr-box">
            <img src="/images/qr.png" alt="QR" className="qr-img" />
            <span>Escanea el código QR para pagar fácilmente</span>
          </div>
        </div>

        <div className="col">
          <div className="placeholder-box">Contenido futuro</div>
        </div>
      </div>

      <div className="row-7">
        <button className="btn metrics-btn">Ver Métricas</button>
      </div>
    </div>
  );
};

export default CreateProduct;
