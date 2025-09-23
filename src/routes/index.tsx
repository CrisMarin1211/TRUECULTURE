import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage';
import MyPurchasesPage from '../pages/myPurchasesPage';
import MyCartPage from '../pages/myCartPage';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-purchases" element={<MyPurchasesPage />} />
        <Route path="/my-cart" element={<MyCartPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
