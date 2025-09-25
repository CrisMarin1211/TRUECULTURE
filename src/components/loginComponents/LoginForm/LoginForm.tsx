import './LoginForm.css';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import GoogleIcon from '../../../assets/Marca/icon-google.png';
import { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login con:', { email, password });
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
        Don’t have an account? <a href="/register">Crear cuenta</a>
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
