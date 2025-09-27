import { useEffect, useState } from 'react';
import Header from '../../components/header';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { stringAvatar } from '../../utils/avatarHelper';
import './style.css';

type StoredUser = {
  name?: string;
  email?: string;
  password?: string;
};

const ProfilePage = () => {
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed: StoredUser = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        console.error('Error parsing user from localStorage', err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-content">
        {!user ? (
          <div style={{ color: 'white', padding: '1rem' }}>No hay datos de usuario guardados.</div>
        ) : (
          <>
            {/* Columna izquierda */}
            <div className="profile-left">
              <div className="card">
                <div className="card-header">
                  {/* placeholder: aquí puede ir el handler para editar */}
                  <img src="/icons/edit.png" alt="edit" className="edit-icon" />
                </div>

                {/* Avatar con iniciales */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      {...stringAvatar(user.name || 'U')}
                      sx={{ width: 80, height: 80, fontSize: '2rem' }}
                    />
                  </Stack>
                </div>

                <hr className="divider" />

                {/* Nombre y correo dinámicos (SIN mostrar password) */}
                <h2 className="profile-name">{user.name || 'Usuario'}</h2>
                <p className="profile-email">{user.email || 'Sin correo'}</p>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="profile-right">
              <div className="card row-1">
                <div className="row-1-left">
                  <img src="/images/trofeo.png" alt="preview" className="card-img" />
                </div>
                <div className="row-1-right"></div>
              </div>

              <div className="row-2">
                <div className="card small-card">
                  <img src="/images/image1.png" alt="card" className="card-img" />
                  <div className="card-text">{/* Texto futuro */}</div>
                </div>
                <div className="card small-card">
                  <div className="card-text">{/* Texto futuro */}</div>
                </div>
                <div className="card small-card">
                  <img src="/images/image2.png" alt="card" className="card-img" />
                  <div className="card-text">{/* Texto futuro */}</div>
                </div>
                <div className="card small-card">
                  <div className="card-text">{/* Texto futuro */}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
