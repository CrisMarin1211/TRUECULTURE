import { useEffect, useState } from 'react';
import './style.css';
import SidebarAdmin from '../../../components/atomsUi/sideBarAdmin';
import { supabase } from '../../../lib/supabaseClient';
import { getUserProfileByEmail, updateUserProfile } from '../../../services/users';
import type { UserProfile } from '../../../types/UserType';
import type { User } from '@supabase/supabase-js';
import Loader from '../../../components/loader';

const ProfileAdminPage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        if (user.email) {
          const profileData = await getUserProfileByEmail(user.email);
          setProfile(profileData);
        }
      }
      setLoading(false);
    };

    fetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user?.email) {
        getUserProfileByEmail(session.user.email).then(setProfile);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleChange = (field: keyof UserProfile, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    if (!user?.id || !profile) return;

    setSaving(true);
    try {
      const { id, auth_id, created_at, updated_at, ...updateData } = profile;
      await updateUserProfile(user.id, updateData);
      alert('Cambios guardados correctamente');
    } catch {
      alert('Error al guardar cambios');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarClick = () => {
    setNewAvatarUrl(user?.user_metadata?.avatar_url || user?.user_metadata?.picture || profile?.avatar_url || '');
    setShowModal(true);
  };

  const handleAvatarSave = async () => {
    if (!user?.id || !profile) return;

    const updatedProfile = { ...profile, avatar_url: newAvatarUrl };
    setProfile(updatedProfile);
    setShowModal(false);

    try {
      await updateUserProfile(user.id, { avatar_url: newAvatarUrl });
    } catch {
      alert('Error al actualizar avatar');
    }
  };

  if (loading) return <Loader />;

  if (!profile)
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
                  src={user?.user_metadata?.avatar_url || user?.user_metadata?.picture || profile.avatar_url || 'https://i.pravatar.cc/120?img=5'}
                  alt="Usuario"
                  className="profile-avatar"
                  onClick={handleAvatarClick}
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
                  <select
                    value={profile.gender || ''}
                    onChange={(e) => handleChange('gender', e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="input-label">País</label>
                  <select
                    value={profile.country || ''}
                    onChange={(e) => handleChange('country', e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Colombia">Colombia</option>
                    <option value="México">México</option>
                    <option value="Argentina">Argentina</option>
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label className="input-label">Idioma</label>
                  <select
                    value={profile.language || ''}
                    onChange={(e) => handleChange('language', e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Español">Español</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Portugués">Portugués</option>
                  </select>
                </div>

                <div>
                  <label className="input-label">Zona horaria</label>
                  <select
                    value={profile.timezone || ''}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="America/Bogota">América/Bogotá (GMT-5)</option>
                    <option value="America/Mexico_City">América/México (GMT-6)</option>
                    <option value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</option>
                  </select>
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Actualizar foto de perfil</h4>
            <input
              type="text"
              placeholder="URL de la nueva imagen"
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button onClick={handleAvatarSave}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAdminPage;