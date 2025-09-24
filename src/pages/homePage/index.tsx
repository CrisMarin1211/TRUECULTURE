import { useNavigate, Link } from 'react-router-dom';
import './style.css';

const HomePage = () => {
  const navigate = useNavigate();
  const goToSignUp = () => navigate('/signup');

  return (
    <div className="home-page">
      <header className="header">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <div className="header-right">
          <Link to="/" className="admin-link">
            Administrador
          </Link>
          <button onClick={goToSignUp}>Sign Up</button>
        </div>
      </header>

      <div className="footer-content">
        <div className="footer-left">
          <span className="brand-name">TrueCulture</span>
          <span className="headline">Vive experiencias únicas</span>
          <span className="subtext">
            Gana logros, reseña eventos y apoya a emprendedores locales
          </span>
          <button className="start-btn">Comenzar</button>
        </div>

        <div className="footer-right">
          <img src="/images/home1.png" alt="img1" className="footer-img" />
          <img src="/images/home2.png" alt="img2" className="footer-img" />
          <img src="/images/home3.png" alt="img3" className="footer-img" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
