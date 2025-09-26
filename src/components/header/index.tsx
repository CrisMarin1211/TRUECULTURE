import { useState } from 'react';
import './style.css';
import AvatarLetter from '../AvatarLetter/LetterAvatars';
import SideBar from '../UiAtoms/SideBar/SideBar';
import { styled } from '@mui/material/styles';
import CurrentLocation from '../currentLocation/index';

const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.4)',
  zIndex: 1000,
});

const SidebarContainer = styled('div')({
  position: 'fixed',
  height: 'auto',
  zIndex: 1001,
});

const HeaderContainer = styled('header')({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  position: 'relative',
});

const HeaderRight = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
});

const CurrentLocationWrapper = styled('div')({
  position: 'absolute',
  top: '100%',
  right: 0,
  marginTop: '8px',
  zIndex: 1002,
});

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      <HeaderContainer>
        <div className="header-left">
          <img
            src="/icons/menu.png"
            alt="Menu"
            className="icon menu-icon"
            onClick={toggleSidebar}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className="header-center">
          <img src="/images/full-logo.png" alt="Logo" className="logo" />
        </div>

        <HeaderRight>
          <img src="/icons/cart.png" alt="Carrito" className="icon cart-icon" />
          <AvatarLetter />

          <CurrentLocationWrapper>
            <CurrentLocation />
          </CurrentLocationWrapper>
        </HeaderRight>
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
