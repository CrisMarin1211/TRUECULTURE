/* eslint-disable prettier/prettier */
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage';
import MyPurchasesPage from '../pages/ClientsPages/myPurchasesPage';
import MyCartPage from '../pages/ClientsPages/myCartPage';
import MyCouponsPage from '../pages/ClientsPages/myCouponsPage';
import DashboardClient from '../pages/ClientsPages/DashboardCliente/DashboardClient';
import ProfilePage from '../pages/ClientsPages/profilePage';
import LoginPage from '../pages/LoginPage/loginPage';
import RegisterPage from '../pages/registerPage/registerPage';
import CreateProductPage from '../pages/AdminPages/productsPages/createPage/createPage';
import ListProductPage from '../pages/AdminPages/productsPages/listPage/listPage';
import MarketplaceHome from '../pages/ClientsPages/MarketplaceHome/MarketplaceHome';
import CreateEventPage from '../pages/AdminPages/eventsPages/createPage';
import ListEventPage from '../pages/AdminPages/eventsPages/listPage';
import Categories from '../pages/ClientsPages/categoriesPage/categories';
import ProfileAdminPage from '../pages/AdminPages/profilePage';
import ListCommentsPage from '../pages/AdminPages/commentsPage';
import CreateTicketPage from '../pages/AdminPages/ticketsPages/createPage';
import ListTicketsPage from '../pages/AdminPages/ticketsPages/listPage';
import AdminHomePage from '../pages/AdminPages/homePage';
import AdminAnalyticsPage from '../pages/AdminPages/analyticPage';

import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/Marketplacehome" element={<MarketplaceHome />} />
      <Route path="/categories/:city/:tag" element={<Categories />} />

      {/* Cliente */}
      <Route
        path="/DashboardClient"
        element={
          <PrivateRoute>
            <DashboardClient />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-purchases"
        element={
          <PrivateRoute>
            <MyPurchasesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-cart"
        element={
          <PrivateRoute>
            <MyCartPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-coupons"
        element={
          <PrivateRoute>
            <MyCouponsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/dashboardAdmin"
        element={
          <PrivateRoute>
            <AdminHomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-product"
        element={
          <PrivateRoute>
            <CreateProductPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-product/:id"
        element={
          <PrivateRoute>
            <CreateProductPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/list-products"
        element={
          <PrivateRoute>
            <ListProductPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-event"
        element={
          <PrivateRoute>
            <CreateEventPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-event/:id"
        element={
          <PrivateRoute>
            <CreateEventPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/list-events"
        element={
          <PrivateRoute>
            <ListEventPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-ticket"
        element={
          <PrivateRoute>
            <CreateTicketPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-ticket/:id"
        element={
          <PrivateRoute>
            <CreateTicketPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/list-tickets"
        element={
          <PrivateRoute>
            <ListTicketsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <ProfileAdminPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/list-comments"
        element={
          <PrivateRoute>
            <ListCommentsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <PrivateRoute>
            <AdminAnalyticsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
