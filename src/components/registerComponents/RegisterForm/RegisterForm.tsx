import './RegisterForm.css';
import InputField from '../../atomsUi/inputField/inputField';
import Button from '../../atomsUi/button/button';
import GoogleIcon from '../../../assets/Marca/icon-google.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agree) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      });
      if (error) throw error;
      alert('Registro exitoso. Revisa tu correo para confirmar la cuenta.');
      navigate('/DashboardClient');
    } catch (error: any) {
      console.error('Error en registro:', error.message);
      alert(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error en registro con Google:', error.message);
      alert('No se pudo registrar con Google');
    }
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

      <button type="button" className="google-btn" onClick={handleGoogleRegister}>
        <img src={GoogleIcon} alt="Google" className="google-icon" />
        Regístrate con Google
      </button>
    </form>
  );
};

export default RegisterForm;
