import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { stringAvatar } from '../../../utils/avatarHelper';
import { supabase } from '../../../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

const AvatarLetter = () => {
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setAvatarUrl(user.user_metadata?.avatar_url || user.user_metadata?.picture || null);
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        setAvatarUrl(session.user?.user_metadata?.avatar_url || session.user?.user_metadata?.picture || null);
      } else {
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

export default AvatarLetter;
