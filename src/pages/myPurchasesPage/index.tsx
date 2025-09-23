import { CurrentLocation } from '../../components/currentLocation';
import Header from '../../components/header';
import './style.css';

const MyPurchasesPage = () => {
  return (
    <>
      <div className="my-purchases-page">
        <Header />
        <CurrentLocation />
      </div>
    </>
  );
};

export default MyPurchasesPage;
