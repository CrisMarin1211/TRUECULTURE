import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { supabase } from '../../../lib/supabaseClient';
import { getUserProfileByEmail } from '../../../services/users';
import { stringAvatar } from '../../../utils/avatarHelper';
import type { User, Session } from '@supabase/supabase-js';

const AvatarUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const fetchData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);

    if (user?.email) {
      const profile = await getUserProfileByEmail(user.email);

      const url =
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        profile?.avatar_url ||
        null;

      setAvatarUrl(url);
    }
  };

  useEffect(() => {
    fetchData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      if (session?.user) {
        setUser(session.user);
        fetchData();
      } else {
        setUser(null);
        setAvatarUrl(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <Stack direction="row" spacing={2}>
      {avatarUrl ? (
        <Avatar
          src={avatarUrl}
          alt={user.user_metadata?.full_name || 'User'}
          sx={{ width: 48, height: 48 }}
        />
      ) : (
        <Avatar
          {...stringAvatar(user.user_metadata?.full_name || user.email || 'U')}
          sx={{ width: 48, height: 48 }}
        />
      )}
    </Stack>
  );
};

export default AvatarUser;