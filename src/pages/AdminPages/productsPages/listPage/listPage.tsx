import React, { useEffect, useState } from 'react';
import './listPage.css';
import AdminProductCard from '../../../../components/adminProductCard';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '../../../../components/atomsUi/sideBarAdmin';
import { getProducts } from '../../../../services/products';
import type { ProductItem } from '../../../../types/ProductType';
import Loader from '../../../../components/loader';

const ListProductPage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getProductStatus = (p: ProductItem): 'Activo' | 'No activo' | 'Sin stock' | 'Borrador' => {
    if (p.isdraft) return 'Borrador';
    if (p.availablestock === 0) return 'Sin stock';
    return p.status;
  };

  const filteredProducts = products.filter((p) => {
    const searchLower = search.toLowerCase();

    const matchesSearch =
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      (p.tags?.toLowerCase?.().includes(searchLower) ?? false);

    const status = getProductStatus(p);
    const matchesStatus = filterStatus ? status === filterStatus : true;

    return matchesSearch && matchesStatus;
  });

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <SidebarAdmin />
      <main className="main-content">
        <div className="header-card">
          <div className="row row-1">
            <h4 className="title">Gestión de Productos</h4>
            <input
              type="text"
              placeholder="Buscar producto..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="row row-2">
            <div className="actions-left">
              <button className="btn-pink" onClick={() => navigate('/create-product')}>
                Nuevo Producto
              </button>
              {/* <button className="btn-outline">Visión General</button> */}
            </div>
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Filtrar por estado</option>
              <option value="Activo">Activos</option>
              <option value="No activo">No activos</option>
              <option value="Sin stock">Sin stock</option>
              <option value="Borrador">Borradores</option>
            </select>
          </div>
        </div>

        <div className="products-container">
          <div className="products-header">
            <h3>Todos los Productos</h3>
            <div className="status-bubbles">
              <div className="status-item">
                <span className="bubble active"></span>
                <span>Activos</span>
              </div>
              <div className="status-item">
                <span className="bubble paused"></span>
                <span>No activos</span>
              </div>
              <div className="status-item">
                <span className="bubble out"></span>
                <span>Sin stock</span>
              </div>
              <div className="status-item">
                <span className="bubble draft"></span>
                <span>Borradores</span>
              </div>
            </div>
          </div>

          <div className="products-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <AdminProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No se encontraron productos.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListProductPage;
