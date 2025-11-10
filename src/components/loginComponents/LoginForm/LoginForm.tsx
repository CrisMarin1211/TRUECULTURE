import './LoginForm.css';
import InputField from '../../atomsUi/inputField/inputField';
import Button from '../../atomsUi/button/button';
import GoogleIcon from '../../../assets/Marca/icon-google.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // Verificar que la sesión se haya establecido correctamente
      if (data.session && data.user) {
        // Redirigir inmediatamente al dashboard - Supabase ya estableció la sesión
        navigate('/DashboardClient', { replace: true });
      } else {
        throw new Error('No se pudo establecer la sesión');
      }
    } catch (error: any) {
      console.error('Error en login:', error.message);
      alert('Email o contraseña incorrectos');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/DashboardClient`
        }
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error en login con Google:', error.message);
      alert('No se pudo iniciar sesión con Google');
    }
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

      <button type="button" className="google-btn" onClick={handleGoogleLogin}>
        <img src={GoogleIcon} alt="Google" className="google-icon" />
        Inicia sesión con Google
      </button>
    </form>
  );
};

export default LoginForm;
