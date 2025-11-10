import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import theme from '../../../styles/theme';
import { supabase } from '../../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
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
          backgroundColor: theme.palette.pink.main,
          opacity: 0.9,
        },
      }}
    >
      <LogoutIcon /> Cerrar sesión
    </Button>
  );
};

export default LogOutButton;
