import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import './style.css';
import type { UserProfile } from '../../types/UserType';
import { getUserProfileByEmail } from '../../services/users';
import { supabase } from '../../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

const HeaderProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
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

  const userName = profile?.name || 'Cargando...';
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || profile?.avatar_url || '';

  return (
    <div className="header-profile">
      <Avatar src={avatarUrl} className="profile-avatar" />
      <div className="profile-info">
        <h2 className="profile-name">Bienvenida {userName}!</h2>
        <span className="profile-role">Administrador del sistema</span>
      </div>
    </div>
  );
};

export default HeaderProfile;
