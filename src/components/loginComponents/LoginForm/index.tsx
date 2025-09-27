import './style.css';
import InputField from '../../UiAtoms/inputField';
import Button from '../../UiAtoms/button';
import GoogleIcon from '../../../assets/Marca/icon-google.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Login con:', { email, password });
  // };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('No hay usuarios registrados. Regístrate primero.');
      return;
    }

    const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);

    console.log('Usuario guardado:', { storedEmail, storedPassword });
    console.log('Usuario intentando loguearse:', { email, password });

    if (email === storedEmail && password === storedPassword) {
      console.log('Inicio de sesión exitoso');
      alert('Inicio de sesión exitoso');
    } else {
      console.log('Credenciales incorrectas');
      alert('Email o contraseña incorrectos');
    }

    navigate('/DashboardClient');
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <InputField
        label="Email address*"
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        label="Password*"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="forgot-password">
        <a href="/forgot-password">Forgot your password?</a>
      </p>

      <Button label="Iniciar Sesión" type="submit" />

      <p className="signup-text">
        Don’t have an account? <a href="/signup">Crear cuenta</a>
      </p>

      <div className="divider">
        <span className="line"></span>
        <span className="or">Or</span>
        <span className="line"></span>
      </div>

      <button type="button" className="google-btn">
        <img src={GoogleIcon} alt="Google" className="google-icon" />
        Regístrate con Google
      </button>
    </form>
  );
};

export default LoginForm;
