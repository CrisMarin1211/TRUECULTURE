import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage';
import MyPurchasesPage from '../pages/myPurchasesPage';
import MyCartPage from '../pages/myCartPage';
import MyCouponsPage from '../pages/myCouponsPage';
import DashboardClient from '../pages/ClientsPages/dashboardCliente/DashboardClient';
import ProfilePage from '../pages/profilePage';
import LoginPage from '../pages/loginPage/loginPage';
import RegisterPage from '../pages/registerPage/registerPage';
import CreateProductPage from '../pages/AdminPages/productsPages/createPage/createPage';
import ListProductPage from '../pages/AdminPages/productsPages/listPage/listPage';
import MarketplaceHome from '../pages/MarketplaceHome/MarketplaceHome';
import CreateEventPage from '../pages/AdminPages/eventsPages/createPage';
import ListEventPage from '../pages/AdminPages/eventsPages/listPage';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-purchases" element={<MyPurchasesPage />} />
        <Route path="/my-cart" element={<MyCartPage />} />
        <Route path="/my-coupons" element={<MyCouponsPage />} />
        <Route path="/my-profile" element={<ProfilePage />} />

        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/edit-product/:id" element={<CreateProductPage />} />
        <Route path="/list-products" element={<ListProductPage />} />

        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/edit-event/:id" element={<CreateEventPage />} />
        <Route path="/list-events" element={<ListEventPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />

        <Route path="/DashboardClient" element={<DashboardClient />} />
        <Route path="/Marketplacehome" element={<MarketplaceHome />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
