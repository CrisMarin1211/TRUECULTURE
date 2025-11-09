import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import theme from '../../../styles/theme';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogOutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Button
      variant="text"
      onClick={handleLogout}
      sx={{
        backgroundColor: theme.palette.pink.main,
        color: theme.palette.white.main,
        fontWeight: 600,
        padding: 2,
        width: '90%',
        '&:hover': {
          backgroundColor: theme.palette.pink.dark,
        },
      }}
    >
      <LogoutIcon sx={{ mr: 1 }} />
      Cerrar sesión
    </Button>
  );
};

export default LogOutButton;
