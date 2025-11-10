/* eslint-disable prettier/prettier */
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage';
import MyPurchasesPage from '../pages/ClientsPages/myPurchasesPage';
import MyCartPage from '../pages/ClientsPages/myCartPage';
import MyCouponsPage from '../pages/ClientsPages/myCouponsPage';
import DashboardClient from '../pages/ClientsPages/dashboardCliente/DashboardClient';
import ProfilePage from '../pages/ClientsPages/profilePage';
import LoginPage from '../pages/loginPage/loginPage';
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
import ListOrdersPage from '../pages/AdminPages/ordersPage';

import PrivateRoute from './PrivateRoute';
import CheckoutPage from '../pages/ClientsPages/checkoutPage';
import PurchaseSuccessPage from '../pages/ClientsPages/purchaseSuccessPage';

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/Marketplacehome" element={<MarketplaceHome />} />
      <Route path="/categories/:city/:tag" element={<Categories />} />


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
        path="/checkout"
        element={
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/purchase-success/:orderId"
        element={
          <PrivateRoute>
            <PurchaseSuccessPage />
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

      <Route
        path="/DashboardAdmin"
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

      <Route
        path="/list-orders"
        element={
          <PrivateRoute>
            <ListOrdersPage />
          </PrivateRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;
