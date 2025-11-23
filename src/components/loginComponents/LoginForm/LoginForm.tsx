import './LoginForm.css';
import InputField from '../../atomsUi/inputField/inputField';
import Button from '../../atomsUi/button/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

interface LoginFormProps {
  fromAdmin?: boolean;
}

const LoginForm = ({ fromAdmin = false }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 Google eliminado

  const handleGoToSignup = () => {
    navigate('/signup', { state: { fromAdmin } });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      alert('Inicio de sesión exitoso');

      if (fromAdmin) {
        navigate('/DashboardAdmin');
      } else {
        navigate('/DashboardClient');
      }
    } catch (error: any) {
      console.error('Error en login:', error.message);
      alert('Email o contraseña incorrectos');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <InputField
        label="Correo Electrónico*"
        type="email"
        placeholder="Introduzca su correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        label="Contraseña*"
        type="password"
        placeholder="Introduce la contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="forgot-password">
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
      </p>

      <Button label="Iniciar Sesión" type="submit" />

      <p className="signup-text">
        ¿No tienes una cuenta?{' '}
        <span className="link" onClick={handleGoToSignup}>
          Crear cuenta
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
