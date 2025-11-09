import './RegisterForm.css';
import InputField from '../../atomsUi/inputField/inputField';
import Button from '../../atomsUi/button/button';
import GoogleIcon from '../../../assets/Marca/icon-google.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

interface RegisterFormProps {
  fromAdmin?: boolean;
}

const RegisterForm = ({ fromAdmin = false }: RegisterFormProps) => {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();

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
      await signup({
        email,
        password,
        name,
        ...(fromAdmin && { organization }),
      });

      alert('Registro exitoso. Revisa tu correo para confirmar la cuenta.');
      if (fromAdmin) {
        navigate('/dashboard');
      } else {
        navigate('/DashboardClient');
      }
    } catch (error: any) {
      console.error('Error en registro:', error.message);
      alert(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
     if (fromAdmin) {
        navigate('/DashboardAdmin');
      } else {
        navigate('/DashboardClient');
      }
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

      {fromAdmin && (
        <InputField
          label="Organization*"
          type="text"
          placeholder="Enter organization name"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
      )}

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
        ¿Ya tienes una cuenta?{' '}
        <a
          onClick={() => navigate('/login', { state: { fromAdmin } })}
          style={{ cursor: 'pointer' }}
        >
          Inicia sesión
        </a>
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
