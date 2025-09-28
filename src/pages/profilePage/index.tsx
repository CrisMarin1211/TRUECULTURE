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
            <div className="profile-left">
              <div className="card">
                <div className="card-header">
                  <img src="/icons/edit.png" alt="edit" className="edit-icon" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      {...stringAvatar(user.name || 'U')}
                      sx={{ width: 80, height: 80, fontSize: '2rem' }}
                    />
                  </Stack>
                </div>

                <hr className="divider" />

                <h2 className="profile-name">{user.name || 'Usuario'}</h2>
                <p className="profile-email">{user.email || 'Sin correo'}</p>
              </div>
            </div>

            <div className="profile-right">
              <div className="card row-1">
                <div className="row-1-left">
                  <img src="/images/trofeo.png" alt="preview" className="card-img" />
                </div>
                <div className="row-1-right"></div>
              </div>

              <div className="row-2">
                <div className="mini-card">
                  <img src="/images/image1.png" alt="card" className="mini-card-img" />
                  <div className="mini-card-text">Texto futuro 1</div>
                </div>

                <div className="mini-card">
                  <div className="mini-card-text">Texto futuro 2</div>
                </div>

                <div className="mini-card">
                  <img src="/images/image2.png" alt="card" className="mini-card-img" />
                  <div className="mini-card-text">Texto futuro 3</div>
                </div>

                <div className="mini-card">
                  <div className="mini-card-text">Texto futuro 4</div>
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
