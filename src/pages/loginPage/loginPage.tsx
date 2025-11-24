import { useLocation } from 'react-router-dom';
import './loginPage.css';
import LoginForm from '../../components/loginComponents/LoginForm/LoginForm';
import LogoCompleto from '../../assets/Marca/Logocompleto.png';
import Logoazul from '../../assets/Marca/Logoazul.png';

const LoginPage = () => {
  const location = useLocation();
  const fromAdmin = location.state?.fromAdmin || false;

  return (
    <div className="login-page">
      <header className="header-login">
        <img src={LogoCompleto} alt="LogoCompleto" className="logocompleto" />
        <span className="phrase">Estamos felices de tenerte de vuelta.</span>
        <div className="login-container">
          <LoginForm fromAdmin={fromAdmin} />
        </div>
      </header>

      <img src={Logoazul} alt="LogoAzul" className="logoazul" />
    </div>
  );
};

export default LoginPage;