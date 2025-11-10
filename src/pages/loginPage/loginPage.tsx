import './loginPage.css';
import LoginForm from '../../components/loginComponents/LoginForm/LoginForm';
import LogoCompleto from '../../assets/Marca/Logocompleto.png';
import Logoazul from '../../assets/Marca/logoazul.png';

const LoginPage = () => {
  return (
    <div className="login-page">
      <header className="header-login">
        <img src={LogoCompleto} alt="LogoCompleto" className="logocompleto" />
        <span className="phrase">Estamos felices de tenerte de vuelta.</span>
        <div className="login-container">
          <LoginForm />
        </div>
      </header>

      <img src={Logoazul} alt="LogoAzul" className="logoazul" />
    </div>
  );
};

export default LoginPage;
