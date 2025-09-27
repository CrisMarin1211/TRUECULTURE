import React, { useEffect, useState } from 'react';
import './style.css';
import AdminProductCard from '../../../../components/adminProductCard';

type Product = {
  id: string;
  image: string;
  name: string;
  price: number;
  Stock: number;
  popularity: string;
  location: string;
  Status: string;
};

const ListProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  return (
    <div className="page-container">
      <aside className="sidebar"></aside>
      <main className="main-content">
        <div className="header-card">
          <div className="row row-1">
            <h4 className="title">Gestión de Productos</h4>
            <input type="text" placeholder="Search ..." className="search-input" />
          </div>
          <div className="row row-2">
            <div className="actions-left">
              <button className="btn-pink">Nuevo Producto</button>
              <button className="btn-outline">Visión General</button>
            </div>
            <select className="filter-select">
              <option value="">Filtrar por estado</option>
              <option value="Activo">Activo</option>
              <option value="Pausado">Pausado</option>
              <option value="Agotado">Agotado</option>
            </select>
          </div>
        </div>
        <div className="products-container">
          <div className="products-header">
            <h3>Todos los Productos</h3>
            <div className="status-bubbles">
              <div className="status-item">
                <span className="bubble active"></span>
                <span className="status-label">Activos</span>
              </div>
              <div className="status-item">
                <span className="bubble paused"></span>
                <span className="status-label">Pausados</span>
              </div>
              <div className="status-item">
                <span className="bubble out"></span>
                <span className="status-label">Agotados</span>
              </div>
            </div>
          </div>

          <div className="products-list">
            {products.map((product) => (
              <AdminProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                price={`$${product.price}`}
                stock={product.Stock}
                other={product.popularity}
                location={product.location}
                status={product.Status}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListProductPage;
