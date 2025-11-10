import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AvatarLetter from '../atomsUi/avatarLetter';
import SideBar from '../atomsUi/sideBar';
import CurrentLocation from '../atomsUi/currentLocation';
import theme from '../../styles/theme';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Box, Badge } from '@mui/material';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContex';

const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.black70.main,
  zIndex: 1000,
});

const SidebarContainer = styled('div')({
  position: 'fixed',
  height: '100%',
  backgroundColor: theme.palette.background.default,
  zIndex: 1001,
  paddingLeft: '1rem',
  display: 'flex',
});

const HeaderContainer = styled('header')({
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: 2,
});

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  
  // Calcular el total de artículos en el carrito
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <HeaderContainer>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%', position: 'relative', height: '100px', padding: 3 }}
        >
          <MenuOutlinedIcon
            onClick={toggleSidebar}
            sx={{ cursor: 'pointer', width: 36, height: 36, marginTop: '-5px' }}
          />

          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Box
              component="img"
              src="/images/full-logo.png"
              alt="Logo desktop"
              sx={{ display: { xs: 'none', md: 'block' }, height: 60 }}
            />

            <Box
              component="img"
              src="/images/logo.png"
              alt="Logo móvil"
              sx={{ display: { xs: 'block', md: 'none' }, height: 50 }}
            />
          </Box>

          <Stack direction="row" spacing={2} alignItems="center" justifyItems="center">
            <Box
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                marginRight: 1
              }}
            >
              <CurrentLocation />
            </Box>
            
            <Box
              sx={{ cursor: 'pointer', position: 'relative' }}
              onClick={() => navigate('/my-cart')}
            >
              <Badge
                badgeContent={totalItems}
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#99CB36',
                    color: '#1a181b',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    minWidth: '20px',
                    height: '20px',
                    padding: '0 6px',
                  },
                }}
              >
                <ShoppingCartOutlinedIcon
                  sx={{ width: 36, height: 36 }}
                />
              </Badge>
            </Box>

            <Box
              sx={{ display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
              onClick={() => navigate('/my-profile')}
            >
              <AvatarLetter />
            </Box>
          </Stack>
        </Stack>
      </HeaderContainer>

      {isSidebarOpen && (
        <>
          <Overlay onClick={toggleSidebar} />
          <SidebarContainer>
            <SideBar toggleSidebar={toggleSidebar} />
          </SidebarContainer>
        </>
      )}
    </>
  );
};

export default Header;
