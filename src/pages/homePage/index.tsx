import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import Header from '../../components/header';
import './style.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const goToSignUp = () => navigate('/signup');
  const goToLogin = () => navigate('/login');
  const goToDashboard = () => navigate('/DashboardClient');

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
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
      (s.thumbs || []).forEach((t) => {
        const tt = new Image();
        tt.src = t;
      });
    });

    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 2000);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${slides[current].image})`,
  };

  return (
    <div className="home-page" style={backgroundStyle}>
      {user ? (
        <div className="header-wrapper">
          <Header />
        </div>
      ) : (
        <header className="header">
          <img src="/images/logo.png" alt="Logo" className="logo" />
          <div className="header-right">
            <Link to="/login" className="admin-link">
              Iniciar sesión
            </Link>
            <button onClick={goToSignUp} className="signup-btn">
              Registrarse
            </button>
          </div>
        </header>
      )}

      <div className="footer-content">
        <div className="footer-left">
          <span className="brand-name">TrueCulture</span>
          <span className="headline">{slides[current].headline}</span>
          <span className="subtext">{slides[current].subtext}</span>
          <button onClick={user ? goToDashboard : goToLogin} className="start-btn">
            {user ? 'Ir al Dashboard' : 'Comenzar'}
          </button>
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
