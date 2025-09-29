import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import theme from '../../../styles/theme';

const LogOutButton = () => {
  return (
    <Button
      variant="text"
      sx={{
        backgroundColor: theme.palette.pink.main,
        color: theme.palette.white.main,
        fontWeight: 600,
        padding: 2,
        width: '90%',
      }}
    >
      <LogoutIcon /> Cerrar sesión
    </Button>
  );
};

export default LogOutButton;
