import theme from '../styles/theme';

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringAvatar(name: string) {
  const words = name.trim().split(' ').filter(Boolean);

  let initials = '';
  if (words.length === 1) {
    initials = words[0].substring(0, 2).toUpperCase();
  } else if (words.length >= 2) {
    initials = `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return {
    sx: {
      bgcolor: theme.palette.grayMedium.main,
      color: theme.palette.black70.main,
      fontSize: '20px',
      fontWeight: 600,
      width: 48,
      height: 48,
    },
    children: initials,
  };
}
