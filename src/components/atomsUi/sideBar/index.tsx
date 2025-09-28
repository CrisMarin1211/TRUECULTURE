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
import theme from '../../../styles/theme';

interface SideBarProps {
  toggleSidebar: () => void;
}

const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: 260,
  height: '95%',
  borderRadius: 16,
  border: 1px solid ${theme.palette.grayMedium.main},
  paddingTop: 80,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  [theme.breakpoints.up('md')]: {
    left: '2%',
    transform: 'translate(0, -50%)',
  },
}));

const StyledListItem = styled(ListItem)({
  padding: 0,
});

const StyledListItemButton = styled(ListItemButton)({
  color: theme.palette.white.main,
  transition: 'all 0.1s ease',
  '&:hover': {
    backgroundColor: theme.palette.pink.main,
    transform: 'translateX(3px)',
  },
});

const StyledListItemIcon = styled(ListItemIcon)({
  color: theme.palette.white.main,
});

const StyledListItemText = styled(ListItemText)({
  '& .MuiTypography-root': {
    fontFamily: theme.typography.subtitle1.fontFamily,
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.subtitle1.fontWeight,
    color: theme.palette.white.main,
  },
});

const CloseButton = styled('button')({
  position: 'absolute',
  top: 30,
  right: 10,
  background: 'none',
  border: 'none',
  color: theme.palette.white.main,
  fontSize: 20,
  cursor: 'pointer',
});

const SideBar = ({ toggleSidebar }: SideBarProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    toggleSidebar();
  };

  return (
    <StyledList>
      <CloseButton onClick={toggleSidebar}>✕</CloseButton>

      <StyledListItem disablePadding>
        <StyledListItemButton onClick={() => handleNavigate('/')}>
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
    </StyledList>
  );
};

export default SideBar;