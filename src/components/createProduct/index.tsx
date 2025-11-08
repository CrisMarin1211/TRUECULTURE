import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, updateProduct, deleteProduct, getProducts } from '../../services/products';
import { defaultProduct, type ProductItem } from '../../types/ProductType';
import { supabase } from '../../lib/supabaseClient';
import { getUserOrganizationByEmail } from '../../services/users';
import { getItemSummary } from '../../services/orderItems';
import MetricsModal from '../metricsModal';

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState<ProductItem>({ ...defaultProduct });
  const [openMetrics, setOpenMetrics] = useState(false);
  const [salesData, setSalesData] = useState<{ orders: number; revenue: number }>({
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        try {
          const data = await getProducts();
          const found = data.find((p) => String(p.id) === id);
         if (found) {
            setProduct(found);
            const summary = await getItemSummary(found.name);
            setSalesData(summary);
          }
        } catch (err) {
          console.error('Error al cargar producto:', err);
        }
      }
    };
    loadProduct();
  }, [id]);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user?.email) {
          const organization = await getUserOrganizationByEmail(user.email);
          if (organization) {
            setProduct((prev) => ({
              ...prev,
              organization,
            }));
          }
        }
      } catch (error) {
        console.error('Error al obtener organización del usuario:', error);
      }
    };

    fetchOrganization();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: ['price', 'totalstock', 'availablestock', 'unitssaled'].includes(name)
        ? Number(value)
        : name === 'isdraft'
          ? value === 'true'
          : value,
    }));
  };

  const handleSave = async () => {
    const requiredFields = [
      'name',
      'price',
      'description',
      'location',
      'status',
      'totalstock',
      'availablestock',
      'unitssaled',
      'city',
      'tags',
    ];

    const missingFields = requiredFields.filter(
      (field) => !product[field as keyof ProductItem] && product[field as keyof ProductItem] !== 0,
    );

    if (missingFields.length > 0) {
      alert('Por favor completa todos los campos obligatorios antes de guardar.');
      return;
    }

    try {
      if (id) {
        await updateProduct(Number(id), product);
        alert('Producto actualizado correctamente');
      } else {
        await addProduct(product);
        alert('Producto creado correctamente');
        setProduct({ ...defaultProduct });
      }
      navigate('/list-products');
    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert('Error guardando el producto');
    }
  };

  const handleDelete = async () => {
    if (!id) return alert('No hay un producto para eliminar');
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return;

    try {
      await deleteProduct(Number(id));
      alert('Producto eliminado');
      navigate('/list-products');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error eliminando el producto');
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
              <select id="status" name="status" value={product.status} onChange={handleChange}>
                <option value="">Selecciona estado</option>
                <option value="Activo">Activo</option>
                <option value="No activo">No activo</option>
              </select>
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
            Nivel de Demanda
          </label>
          <select
            id="popularity"
            name="popularity"
            value={product.popularity ?? ''}
            onChange={handleChange}
          >
            <option value="">Selecciona una opción</option>
            <option value="Alta demanda">Alta demanda</option>
            <option value="Media demanda">Media demanda</option>
            <option value="Baja demanda">Baja demanda</option>
          </select>
        </div>
        <div>
          <label className="input-label" htmlFor="tags">
            Categoría / Tags
          </label>
          <select id="tags" name="tags" value={product.tags ?? ''} onChange={handleChange}>
            <option value="">Selecciona una categoría</option>
            <option value="Afiches">Afiches</option>
            <option value="Pines">Pines</option>
            <option value="Cultural">Cultural</option>
            <option value="Moda">Moda</option>
            <option value="Gastronomía">Gastronomía</option>
          </select>
        </div>
      </div>

      <div className="row-5">
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
        <div>
          <label className="input-label" htmlFor="city">
            Ciudad
          </label>
          <select id="city" name="city" value={product.city ?? ''} onChange={handleChange}>
            <option value="">Selecciona una ciudad</option>
            <option value="Cali, Colombia">Cali, Colombia</option>
            <option value="Bogotá, Colombia">Bogotá, Colombia</option>
          </select>
        </div>
        <div>
          <label className="input-label" htmlFor="name">
            Dirección
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={product.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="input-label" htmlFor="isdraft">
            Borrador
          </label>
          <select
            id="isdraft"
            name="isdraft"
            value={String(product.isdraft)}
            onChange={handleChange}
          >
            <option value="">Selecciona</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
<div className="row-7">
        {id && (
          <button className="btn metrics-btn" onClick={() => setOpenMetrics(true)}>
            Ver Métricas
          </button>
        )}
      </div>

      <MetricsModal
        open={openMetrics}
        onClose={() => setOpenMetrics(false)}
        item={product}
        type="product"
        salesData={salesData}
      />
    </div>
  );
};

export default CreateProduct;
