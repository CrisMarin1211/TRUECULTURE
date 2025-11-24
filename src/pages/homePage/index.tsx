import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const goToSignUp = () => navigate('/signup');

  const handleStart = () => {
    if (isMobile) {
      navigate('/mobileStartPage');
    } else {
      navigate('/login');
    }
  };

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
      thumbs: ['/images/home1.png', '/images/home2.png', '/images/home3.png'],
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
      thumbs: ['/images/home2.png', '/images/home3.png', '/images/home1.png'],
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
      thumbs: ['/images/home3.png', '/images/home1.png', '/images/home2.png'],
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
      (s.thumbs || []).forEach((t) => {
        const tt = new Image();
        tt.src = t;
      });
    });

    const intervalTime = isMobile ? 2500 : 2000;

    const id = setInterval(() => {
      setCurrent((c) => {
        if (c === slides.length - 1) return c;
        return c + 1;
      });
    }, intervalTime);

    return () => clearInterval(id);
  }, [isMobile, slides.length]);

  const backgroundStyle = {
    backgroundImage: `url(${slides[current].image})`,
  };

  return (
    <div className="home-page" style={backgroundStyle}>
      <header className="header">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <div className="header-right">
          <Link to="/login" className="admin-link" state={{ fromAdmin: true }}>
            Administrador
          </Link>
          <button onClick={goToSignUp} className="signup-btn">
            Registrarse
          </button>
        </div>
      </header>

      <div className="footer-content">
        <div className="footer-left">
          <span className="brand-name">TrueCulture</span>
          <span className="headline">{slides[current].headline}</span>
          <span className="subtext">{slides[current].subtext}</span>
          <div className="dots-container">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`dot ${current === i ? 'active' : ''}`}></span>
            ))}
          </div>

          {!isMobile && (
            <button onClick={handleStart} className="start-btn">
              Comenzar
            </button>
          )}

          {isMobile && current === slides.length - 1 && (
            <button onClick={handleStart} className="start-btn">
              Comenzar
            </button>
          )}
        </div>

        <div className="footer-right">
          {slides[current].thumbs.map((thumb, i) => (
            <img key={i} src={thumb} alt={`thumb-${i}`} className="footer-img" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
