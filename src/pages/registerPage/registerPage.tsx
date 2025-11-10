import { useLocation } from 'react-router-dom';
import './style.css';
import RegisterForm from '../../components/registerComponents/RegisterForm/RegisterForm';
import LogoCompleto from '../../assets/Marca/Logocompleto.png';
import LogoFucsia from '../../assets/Marca/LogoFucsia.png';

const RegisterPage = () => {
  const location = useLocation();
  const fromAdmin = location.state?.fromAdmin || false;

  return (
    <div className="register-page">
      <header className="header-register">
        <img src={LogoCompleto} alt="LogoCompleto" className="logocompleto" />

        <span className="phrase-register">Por favor, ingresa tus datos para crear una cuenta.</span>

        <div className="register-container">
          <RegisterForm fromAdmin={fromAdmin} />
        </div>

        <footer className="footer-register">
          <img src={LogoFucsia} alt="LogoFucsia" className="logofucsia" />
        </footer>
      </header>
    </div>
  );
};

export default RegisterPage;