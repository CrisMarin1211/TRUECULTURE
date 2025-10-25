import { useEffect, useState } from 'react';
import './style.css';
import SidebarAdmin from '../../../components/atomsUi/sideBarAdmin';
import { supabase } from '../../../lib/supabaseClient';
import { getUserProfileByEmail, updateUserProfile } from '../../../services/users';
import type { UserProfile } from '../../../types/UserType';

const ProfileAdminPage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        const profileData = await getUserProfileByEmail(user.email);
        setProfile(profileData);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (field: keyof UserProfile, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    const authId = localStorage.getItem('user_id');
    if (!authId) {
      alert('No se encontró el ID de usuario. Vuelve a iniciar sesión.');
      return;
    }

    if (!profile) return;
    setSaving(true);

    try {
      await updateUserProfile(authId, {
        name: profile.name,
        nickname: profile.nickname,
        gender: profile.gender,
        country: profile.country,
        language: profile.language,
        timezone: profile.timezone,
      });
      alert('Cambios guardados correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al guardar cambios');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <SidebarAdmin />
        <main className="main-content">
          <div className="header-card">
            <h4 className="title">Cargando perfil...</h4>
          </div>
        </main>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="page-container">
        <SidebarAdmin />
        <main className="main-content">
          <div className="header-card">
            <h4 className="title">No se encontró el perfil del usuario</h4>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-container">
      <SidebarAdmin />
      <main className="main-content">
        <div className="header-card">
          <h4 className="title">Configuración del Perfil</h4>

          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-info">
                <img
                  src="https://i.pravatar.cc/120?img=5"
                  alt="Usuario"
                  className="profile-avatar"
                />
                <div className="profile-texts">
                  <strong className="profile-name">{profile.name || '(Sin nombre)'}</strong>
                  <span className="profile-org">
                    Organización:{' '}
                    <span className="profile-org-name">{profile.organization || '—'}</span>
                  </span>
                  <span className="profile-username">@{profile.nickname || 'usuario'}</span>
                </div>
              </div>
              <button className="btn-save" onClick={handleSave} disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>

            <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
              <div className="grid-2">
                <div>
                  <label className="input-label">Nombre completo</label>
                  <input
                    type="text"
                    value={profile.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">Nick name</label>
                  <input
                    type="text"
                    value={profile.nickname || ''}
                    onChange={(e) => handleChange('nickname', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label className="input-label">Género</label>
                  <input
                    type="text"
                    value={profile.gender || ''}
                    onChange={(e) => handleChange('gender', e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">País</label>
                  <input
                    type="text"
                    value={profile.country || ''}
                    onChange={(e) => handleChange('country', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label className="input-label">Idioma</label>
                  <input
                    type="text"
                    value={profile.language || ''}
                    onChange={(e) => handleChange('language', e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">Zona horaria</label>
                  <input
                    type="text"
                    value={profile.timezone || ''}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">Organización</label>
                  <input
                    type="text"
                    value={profile.organization || ''}
                    onChange={(e) => handleChange('organization', e.target.value)}
                  />
                </div>
              </div>

              <div className="checkbox-row">
                <label>
                  <input type="checkbox" defaultChecked /> Mi correo es{' '}
                  <span className="email">{profile.email}</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileAdminPage;
