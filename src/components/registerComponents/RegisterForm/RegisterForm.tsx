import './RegisterForm.css';
import InputField from '../../atomsUi/inputField/inputField';
import Button from '../../atomsUi/button/button';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  const { signup } = useAuth();

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
      const from = location.state?.from;
      if (from) {
        navigate(from);
      } else if (fromAdmin) {
        navigate('/DashboardAdmin');
      } else {
        navigate('/DashboardClient');
      }
    } catch (error: any) {
      console.error('Error en registro:', error.message);
      alert(error.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <InputField
        label="Nombre*"
        type="text"
        placeholder="Ingrese su nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {fromAdmin && (
        <InputField
          label="Organización*"
          type="text"
          placeholder="Ingrese el nombre de la organización"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
      )}

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

      <div className="terms">
        <input
          type="checkbox"
          id="terms"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <label htmlFor="terms">
          Estoy de acuerdo con <a href="/terms">Términos y condiciones</a>
        </label>
      </div>

      <div className="register-btn-wrapper">
        <Button label="Crear cuenta" type="submit" />
      </div>

      <p className="login-text">
        ¿Ya tienes una cuenta?{' '}
        <a
          onClick={() => navigate('/login', { state: { from: location.state?.from, fromAdmin } })}
          style={{ cursor: 'pointer' }}
        >
          Inicia sesión
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
