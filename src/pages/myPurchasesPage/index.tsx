import { CurrentLocation } from '../../components/currentLocation';
import Header from '../../components/header';
import ColoredText from '../../components/coloredText';
import './style.css';

const MyPurchasesPage = () => {
  return (
    <>
      <div className="my-purchases-page">
        <Header />
        <CurrentLocation />
        <ColoredText text="Mis cupones" color="#FF0099" />
      </div>
    </>
  );
};

export default MyPurchasesPage;
