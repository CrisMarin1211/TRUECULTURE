import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DashboardIcon from '@mui/icons-material/Dashboard';
import './style.css';
import { Comment } from '@mui/icons-material';

const SidebarAdmin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openOptions, setOpenOptions] = useState(true);
  const [openSupport, setOpenSupport] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/images/full-logo.png" alt="Logo" />
      </div>

      <div className="sidebar-actions">
        <button
          className={sidebar-action-btn ${isActive('/create-event') ? 'active' : ''}}
          onClick={() => navigate('/create-event')}
        >
          <AddCircleIcon className="sidebar-action-icon" />
          <div className="sidebar-action-text">
            <strong>Añade un evento</strong>
            <span className="sidebar-subtext">Evento</span>
          </div>
        </button>

        <button
          className={sidebar-action-btn ${isActive('/create-product') ? 'active' : ''}}
          onClick={() => navigate('/create-product')}
        >
          <AddCircleIcon className="sidebar-action-icon" />
          <div className="sidebar-action-text">
            <strong>Añade un producto</strong>
            <span className="sidebar-subtext">Productos</span>
          </div>
        </button>
      </div>

      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <div className="sidebar-section-header" onClick={() => setOpenOptions(!openOptions)}>
          <h4 className="sidebar-title">Opciones</h4>
          {openOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>

        {openOptions && (
          <ul className="sidebar-menu">
            <li
              className={isActive('/dashboard') ? 'active' : ''}
              onClick={() => navigate('/dashboard')}
            >
              <DashboardIcon className="sidebar-icon" />
              <span>Dashboard</span>
            </li>
            <li
              className={isActive('/list-events') ? 'active' : ''}
              onClick={() => navigate('/list-events')}
            >
              <EventIcon className="sidebar-icon" />
              <span>Gestionar eventos</span>
            </li>
            <li
              className={isActive('/list-products') ? 'active' : ''}
              onClick={() => navigate('/list-products')}
            >
              <InventoryIcon className="sidebar-icon" />
              <span>Gestionar productos</span>
            </li>
            <li
              className={isActive('/list-comments') ? 'active' : ''}
              onClick={() => navigate('/list-comments')}
            >
              <Comment className="sidebar-icon" />
              <span>Gestionar reseñas</span>
            </li>
            <li
              className={isActive('/list-tickets') ? 'active' : ''}
              onClick={() => navigate('/list-tickets')}
            >
              <ConfirmationNumberIcon className="sidebar-icon" />
              <span>Gestionar reservas</span>
            </li>
          </ul>
        )}
      </div>

      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <div className="sidebar-section-header" onClick={() => setOpenSupport(!openSupport)}>
          <h4 className="sidebar-title">Soporte</h4>
          {openSupport ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>

        {openSupport && (
          <ul className="sidebar-menu">
            <li
              className={isActive('/settings') ? 'active' : ''}
              onClick={() => navigate('/settings')}
            >
              <SettingsIcon className="sidebar-icon" />
              <span>Configuraciones</span>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default SidebarAdmin;