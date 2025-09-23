import { Routes, Route, Navigate } from 'react-router-dom';

// Importa tus componentes de pantalla aquí
import Dashboard from '../pages/Administrador/Dashboard';
import EventsPage from '../pages/Administrador/EventsPage';
import TicketsPage from '../pages/Administrador/TicketPage';
import ProductsPage from '../pages/Administrador/ProductsPage';
import ReviewsPage from '../pages/Administrador/ReviewsPage';
import ReportsPage from '../pages/Administrador/ReportPage';
import Config from '../pages/Administrador/Config';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/tickets" element={<TicketsPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/config" element={<Config />} />
      {/* Ruta para 404 - página no encontrada */}
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
};

export default AppRoutes;
