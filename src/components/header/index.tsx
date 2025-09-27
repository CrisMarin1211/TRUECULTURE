import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AvatarLetter from '../UiAtoms/AvatarLetter/LetterAvatars';
import SideBar from '../UiAtoms/SideBar/SideBar';
import CurrentLocation from '../UiAtoms/currentLocation/index';
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
            <img src="/images/full-logo.png" alt="Logo" className="logo" />
          </Box>

          <Stack direction="row" spacing={2} alignItems="center" justifyItems="center">
            <ShoppingCartOutlinedIcon sx={{ cursor: 'pointer', width: 36, height: 36 }} />
            <AvatarLetter />
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
