import React from 'react';
import './style.css';
import SidebarAdmin from '../../../components/atomsUi/sideBarAdmin';

const AdminHomePage: React.FC = () => {
  return (
    <div className="page-container">
      <SidebarAdmin />
      <main className="main-content">
        <div className="home-card">
          <h2 className="welcome-title">Bienvenido al Panel de Administración</h2>
          <p className="welcome-text">
            Aquí podrás gestionar los productos, eventos, reservas, reseñas y más.
          </p>
          <p className="coming-soon">
            🚀 Próximamente: panel de estadísticas, reportes y accesos rápidos.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminHomePage;
