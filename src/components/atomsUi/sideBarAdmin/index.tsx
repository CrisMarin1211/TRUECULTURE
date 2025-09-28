import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './style.css';

const SidebarAdmin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/images/full-logo.png" alt="Logo" />
      </div>

      <div className="sidebar-actions">
        <button className="sidebar-action-btn" onClick={() => navigate('/create-event')}>
          <AddCircleIcon className="sidebar-action-icon" />
          <div className="sidebar-action-text">
            <strong>Añade un evento</strong>
            <span className="sidebar-subtext">Evento</span>
          </div>
        </button>

        <button className="sidebar-action-btn" onClick={() => navigate('/create-product')}>
          <AddCircleIcon className="sidebar-action-icon" />
          <div className="sidebar-action-text">
            <strong>Añade un producto</strong>
            <span className="sidebar-subtext">Productos</span>
          </div>
        </button>
      </div>

      <hr className="sidebar-divider" />

      <h4 className="sidebar-title">Opciones</h4>

      <ul className="sidebar-menu">
        <li onClick={() => navigate('/list-events')}>
          <EventIcon className="sidebar-icon" />
          <span>Manejar eventos</span>
        </li>
        <li onClick={() => navigate('/list-products')}>
          <InventoryIcon className="sidebar-icon" />
          <span>Manejar productos</span>
        </li>
      </ul>
    </aside>
  );
};

export default SidebarAdmin;
