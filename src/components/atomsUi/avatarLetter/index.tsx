import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { stringAvatar } from '../../../utils/avatarHelper';

const AvatarLetter = () => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name || '');
    }
  }, []);

  if (!userName) return null;

  return (
    <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar(userName)} />
    </Stack>
  );
};

export default AvatarLetter;
