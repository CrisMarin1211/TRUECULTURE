import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import logo from '../../../../public/images/logo.png';
import LogOutButton from '../logOutButton/LogOutButton';

interface SideBarProps {
  toggleSidebar: () => void;
}

const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: 260,
  height: '95%',
  borderRadius: 16,
  border: `1px solid ${theme.palette.grayMedium.main}`,
  paddingTop: 80,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999,
  transition: 'all 0.3s ease-in-out',

  [theme.breakpoints.up('lg')]: {
    width: 260,
    left: '2%',
    top: '50%',
    transform: 'translate(0, -50%)',
    overflow: 'hidden', // No scroll en desktop
  },

  [theme.breakpoints.between('sm', 'lg')]: {
    width: 230,
    left: 20,
    top: 0,
    height: '100vh',
    borderRadius: 0,
    transform: 'translate(0, 0)',
    paddingTop: 70,
    overflowY: 'auto', // Scroll solo si es necesario
    paddingBottom: 80, // para que no tape el logout
  },

  [theme.breakpoints.down('sm')]: {
    width: '75vw',
    height: '100vh',
    top: 0,
    left: 20,
    transform: 'translate(0, 0)',
    borderRadius: 0,
    paddingTop: 50,
    overflowY: 'auto',
    paddingBottom: 80,
  },
}));

const StyledListItem = styled(ListItem)({
  padding: 0,
});

/* <-- Aquí está la parte importante: hover + transition reinstaurados --> */
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.white.main,
  transition: 'all 0.12s ease, background-color 0.12s ease',
  padding: '12px 18px',
  // para que el movimiento afecte también al icono y texto sin saltos
  display: 'flex',
  alignItems: 'center',

  '&:hover': {
    backgroundColor: theme.palette.pink.main,
    transform: 'translateX(3px)',
  },

  // cuando esté activo (si quieres agregar active later)
  '&.Mui-selected': {
    backgroundColor: theme.palette.pink.main,
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.white.main,
  minWidth: 40,
  transition: 'transform 0.12s ease, color 0.12s ease',
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontFamily: theme.typography.subtitle1.fontFamily,
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.subtitle1.fontWeight,
    color: theme.palette.white.main,
    transition: 'color 0.12s ease, transform 0.12s ease',
  },
}));

const CloseButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: 20,
  right: 20,
  background: 'none',
  border: 'none',
  color: theme.palette.white.main,
  fontSize: 22,
  cursor: 'pointer',
  zIndex: 10000,

  [theme.breakpoints.up('lg')]: {
    display: 'none', // oculto en desktop
  },
}));

const LogoutContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',

  [theme.breakpoints.down('sm')]: {
    bottom: 30,
  },
}));

const LogoStyles = styled('img')(({ theme }) => ({
  display: 'block',     
  margin: '0 auto',     
  width: 80,

  [theme.breakpoints.between('sm', 'lg')]: {
    width: 65,
  },

  [theme.breakpoints.down('sm')]: {
    width: 55,
  },
}));


const SideBar = ({ toggleSidebar }: SideBarProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    toggleSidebar();
  };

  return (
    <StyledList>
      <LogoStyles src={logo} alt="Logo" />

      <CloseButton onClick={toggleSidebar}>✕</CloseButton>

      <StyledListItem disablePadding>
        <StyledListItemButton onClick={() => handleNavigate('/DashboardClient')}>
          <StyledListItemIcon>
            <HomeIcon />
          </StyledListItemIcon>
          <StyledListItemText primary="Inicio" />
        </StyledListItemButton>
      </StyledListItem>

      <StyledListItem disablePadding>
        <StyledListItemButton onClick={() => handleNavigate('/Marketplacehome')}>
          <StyledListItemIcon>
            <StorefrontIcon />
          </StyledListItemIcon>
          <StyledListItemText primary="Marketplace" />
        </StyledListItemButton>
      </StyledListItem>

      <StyledListItem disablePadding>
        <StyledListItemButton onClick={() => handleNavigate('/my-cart')}>
          <StyledListItemIcon>
            <ShoppingCartIcon />
          </StyledListItemIcon>
          <StyledListItemText primary="Carrito de compras" />
        </StyledListItemButton>
      </StyledListItem>

      <StyledListItem disablePadding>
        <StyledListItemButton onClick={() => handleNavigate('/my-purchases')}>
          <StyledListItemIcon>
            <ReceiptLongIcon />
          </StyledListItemIcon>
          <StyledListItemText primary="Mis compras" />
        </StyledListItemButton>
      </StyledListItem>

      <StyledListItem disablePadding>
        <StyledListItemButton onClick={() => handleNavigate('/my-coupons')}>
          <StyledListItemIcon>
            <LocalOfferIcon />
          </StyledListItemIcon>
          <StyledListItemText primary="Mis cupones" />
        </StyledListItemButton>
      </StyledListItem>

      <StyledListItem disablePadding>
        <StyledListItemButton onClick={() => handleNavigate('/my-profile')}>
          <StyledListItemIcon>
            <AccountCircleIcon />
          </StyledListItemIcon>
          <StyledListItemText primary="Perfil" />
        </StyledListItemButton>
      </StyledListItem>
      <LogoutContainer>
        <LogOutButton />
      </LogoutContainer>
    </StyledList>
  );
};

export default SideBar;
