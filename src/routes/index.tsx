import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage';
import MyPurchasesPage from '../pages/myPurchasesPage';
import MyCartPage from '../pages/myCartPage';
import MyCouponsPage from '../pages/myCouponsPage';
import DashboardClient from '../pages/ClientsPages/DashboardCliente/DashboardClient';
import ProfilePage from '../pages/profilePage';
import LoginPage from '../pages/LoginPage/loginPage';
import RegisterPage from '../pages/RegisterPage/registerPage';
import CreateProductPage from '../pages/AdminPages/productsPages/createPage/createPage';
import ListProductPage from '../pages/AdminPages/productsPages/listPage/listPage';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-purchases" element={<MyPurchasesPage />} />
        <Route path="/my-cart" element={<MyCartPage />} />
        <Route path="/my-coupons" element={<MyCouponsPage />} />
        <Route path="/DashboardClient" element={<DashboardClient />} />
        <Route path="/my-profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/list-products" element={<ListProductPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
