import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AvatarLetter from '../atomsUi/avatarLetter';
import SideBar from '../atomsUi/sideBar';
import CurrentLocation from '../atomsUi/currentLocation';
import theme from '../../styles/theme';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Box } from '@mui/material';
import './style.css';

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
  padding: '32px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      <HeaderContainer>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%', position: 'relative', height: '100px' }}
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
            <ShoppingCartOutlinedIcon sx={{ cursor: 'pointer', width: 36, height: 36 }} />

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <AvatarLetter />
            </Box>
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" sx={{ width: '100%' }}>
          <CurrentLocation />
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
