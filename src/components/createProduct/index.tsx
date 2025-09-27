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
    navigate('/create-product');
  };

  const handleDelete = () => {
    const stored = localStorage.getItem('products');
    if (!stored) return;
    const products: Product[] = JSON.parse(stored);
    const filtered = products.filter((p) => p.id !== product.id);
    localStorage.setItem('products', JSON.stringify(filtered));
    navigate('/create-product');
  };

  return (
    <div className="form-card">
      <div className="row row-1">
        <button className="back-btn" onClick={() => navigate('/create-product')}>
          ←
        </button>
      </div>

      <div className="row row-2">
        <h4>Detalles del Producto</h4>
        <div className="actions">
          <button className="btn save-btn" onClick={handleSave}>
            Guardar
          </button>
          <button className="btn delete-btn" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </div>

      <div className="row row-3">
        <div className="col image-col">
          <input
            type="text"
            name="image"
            placeholder="URL de la imagen"
            value={product.image}
            onChange={handleChange}
          />
        </div>
        <div className="col details-col">
          <div className="grid-2">
            <input
              type="text"
              name="name"
              placeholder="Nombre del Producto"
              value={product.name}
              onChange={handleChange}
            />
            <input
              type="number"
              name="Stock"
              placeholder="Stock"
              value={product.Stock}
              onChange={handleChange}
            />
          </div>
          <div className="grid-2">
            <input
              type="text"
              name="location"
              placeholder="Lugar"
              value={product.location}
              onChange={handleChange}
            />
            <input
              type="text"
              name="Status"
              placeholder="Estado"
              value={product.Status}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row row-4">
        <textarea
          name="description"
          placeholder="Descripción del evento"
          value={product.description}
          onChange={handleChange}
        />
      </div>

      <div className="row row-5 grid-4">
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="totalStock"
          placeholder="Stock Total"
          value={product.totalStock}
          onChange={handleChange}
        />
        <input
          type="number"
          name="availableStock"
          placeholder="Stock Disponible"
          value={product.availableStock}
          onChange={handleChange}
        />
        <input
          type="text"
          name="popularity"
          placeholder="Nivel de Ventas"
          value={product.popularity}
          onChange={handleChange}
        />
      </div>

      <div className="row row-6 grid-2">
        <div className="col">
          <div className="grid-2">
            <input
              type="text"
              name="tags"
              placeholder="Tags"
              value={product.tags}
              onChange={handleChange}
            />
            <input
              type="number"
              name="UnitsSaled"
              placeholder="Unidades Vendidas"
              value={product.UnitsSaled}
              onChange={handleChange}
            />
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

      <div className="row row-7">
        <button className="btn metrics-btn">Ver Métricas</button>
      </div>
    </div>
  );
};

export default CreateProduct;
