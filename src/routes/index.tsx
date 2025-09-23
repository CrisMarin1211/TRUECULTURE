import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage';
import MyPurchasesPage from '../pages/myPurchasesPage';
import MyCartPage from '../pages/myCartPage';
import MyCouponsPage from '../pages/myCouponsPage';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-purchases" element={<MyPurchasesPage />} />
        <Route path="/my-cart" element={<MyCartPage />} />
        <Route path="/my-coupons" element={<MyCouponsPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
