import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, updateProduct, deleteProduct, getProducts } from '../../services/products';
import type { ProductItem } from '../../types/ProductType';

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState<ProductItem>({
    image: '',
    imagefile: null,
    name: '',
    description: '',
    location: '',
    address: '',
    city: undefined,
    price: 0,
    totalstock: 0,
    availablestock: 0,
    unitssaled: 0,
    popularity: undefined,
    tags: undefined,
    status: 'Activo',
    isdraft: false,
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        try {
          const data = await getProducts();
          const found = data.find((p) => p.id === Number(id));
          if (found) setProduct(found);
        } catch (err) {
          console.error('Error al cargar producto:', err);
        }
      }
    };
    loadProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name.toLowerCase().includes('stock') || name === 'unitssaled'
          ? Number(value)
          : value,
    }));
  };

  const handleSave = async () => {
    try {
      if (id) {
        await updateProduct(Number(id), product);
      } else {
        await addProduct(product);
      }
      navigate('/list-products');
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteProduct(Number(id));
      navigate('/list-products');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
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
          {id && (
            <button className="btn delete-btn" onClick={handleDelete}>
              Eliminar
            </button>
          )}
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
              <label className="input-label" htmlFor="availablestock">
                Stock Disponible
              </label>
              <input
                id="availablestock"
                type="number"
                name="availablestock"
                value={product.availablestock}
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
                name="status"
                value={product.status}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row-4">
        <label className="input-label" htmlFor="description">
          Descripción del producto
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
          <label className="input-label" htmlFor="totalstock">
            Stock Total
          </label>
          <input
            id="totalstock"
            type="number"
            name="totalstock"
            value={product.totalstock}
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
            value={product.popularity ?? ''}
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
                value={product.tags ?? ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="input-label" htmlFor="unitssaled">
                Unidades Vendidas
              </label>
              <input
                id="unitssaled"
                type="number"
                name="unitssaled"
                value={product.unitssaled}
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
