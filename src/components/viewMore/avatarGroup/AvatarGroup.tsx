import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Stack from '@mui/material/Stack';

export default function Spacing() {
  return (
    <Stack
      spacing={4}
      sx={{
        // reducir el spacing vertical/horizontal según tamaño
        gap: { xs: 1.5, sm: 2, md: 4 },
      }}
    >
      <AvatarGroup
        spacing="small"
        sx={{
          '& .MuiAvatar-root': {
            width: { xs: 24, sm: 28, md: 32 },
            height: { xs: 24, sm: 28, md: 32 },
            fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
          },
        }}
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      </AvatarGroup>
    </Stack>
  );
}
