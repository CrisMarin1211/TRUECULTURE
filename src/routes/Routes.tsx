import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from '../pages/AdminPages/Dashboard';
import EventsPage from '../pages/AdminPages/EventsPage';
import TicketsPage from '../pages/AdminPages/TicketPage';
import ProductsPage from '../pages/AdminPages/ProductsPage';
import ReviewsPage from '../pages/AdminPages/ReviewsPage';
import ReportsPage from '../pages/AdminPages/ReportPage';
import Config from '../pages/AdminPages/Config';

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
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
};

export default AppRoutes;
