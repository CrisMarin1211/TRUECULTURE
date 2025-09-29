import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style.css';

const HomePage = () => {
  const navigate = useNavigate();

  const goToSignUp = () => navigate('/signup');
  const goToLogin = () => navigate('/login');

  const slides = [
    {
      image: '/images/background-home.png',
      headline: (
        <>
          Vive
          <br /> experiencias
          <br /> únicas
        </>
      ),
      subtext: (
        <>
          Gana logros, reseña eventos y apoya a
          <br /> emprendedores locales.
        </>
      ),
    },
    {
      image: '/images/background-home-tambor.png',
      headline: (
        <>
          Explora
          <br /> Cultura
        </>
      ),
      subtext: (
        <>
          Música, gastronomía, ferias,
          <br /> artes y mucho más.
        </>
      ),
    },
    {
      image: '/images/background-home-mujeres.png',
      headline: (
        <>
          Compra
          <br /> fácil y seguro
        </>
      ),
      subtext: (
        <>
          Gana logros, reseñas, eventos y apoya a
          <br /> emprendedores locales
        </>
      ),
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [slides.length]);

  const backgroundStyle = {
    backgroundImage: `url(${slides[current].image})`,
  };

  return (
    <div className="home-page" style={backgroundStyle}>
      <header className="header">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <div className="header-right">
          <Link to="/login" className="admin-link">
            Administrador
          </Link>
          <button onClick={goToSignUp} className="signup-btn">
            Sign Up
          </button>
        </div>
      </header>

      <div className="footer-content">
        <div className="footer-left">
          <span className="brand-name">TrueCulture</span>
          <span className="headline">{slides[current].headline}</span>
          <span className="subtext">{slides[current].subtext}</span>
          <button onClick={goToLogin} className="start-btn">
            Comenzar
          </button>
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
