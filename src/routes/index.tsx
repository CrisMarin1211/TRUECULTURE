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
        <Route path="/categories/:city/:tag" element={<Categories />} />
        <Route path="/settings" element={<ProfileAdminPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
