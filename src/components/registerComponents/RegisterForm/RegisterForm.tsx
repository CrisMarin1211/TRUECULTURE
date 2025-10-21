import './RegisterForm.css';
import InputField from '../../UiAtoms/InputField/InputField';
import Button from '../../UiAtoms/Button/Button';
import GoogleIcon from '../../../assets/Marca/icon-google.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agree) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const userData = { name, email, password };
    localStorage.setItem('user', JSON.stringify(userData));

    console.log('Usuario registrado:', userData);
    alert('Registro exitoso');

    navigate('/DashboardClient');
  };
  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <InputField
        label="Full Name*"
        type="text"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <div className="terms">
        <input
          type="checkbox"
          id="terms"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <label htmlFor="terms">
          I agree to <a href="/terms">terms & conditions</a>
        </label>
      </div>

      <div className="register-btn-wrapper">
        <Button label="Crear cuenta" type="submit" />
      </div>

      <p className="login-text">
        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
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

export default RegisterForm;
