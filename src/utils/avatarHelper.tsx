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
    // Solo nombre → primeras 2 letras
    initials = words[0].substring(0, 2).toUpperCase();
  } else if (words.length >= 2) {
    // Nombre y apellido → inicial de cada uno
    initials = `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}
