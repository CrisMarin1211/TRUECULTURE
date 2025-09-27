import { useState } from 'react';
import './style.css';
import AvatarLetter from '../AvatarLetter/LetterAvatars';
import SideBar from '../UiAtoms/SideBar/SideBar';
import { styled } from '@mui/material/styles';
import CurrentLocation from '../currentLocation/index';
import theme from '../../styles/theme';

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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '95%',
  height: '186px',
  padding: '32px',
  position: 'relative',
});

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      <HeaderContainer>
        <div>
          <img
            src="/icons/menu.png"
            alt="Menu"
            className="icon menu-icon"
            onClick={toggleSidebar}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div>
          <img src="/images/full-logo.png" alt="Logo" className="logo" />
        </div>

        <div>
          <div>
            <img src="/icons/cart.png" alt="Carrito" className="icon cart-icon" />
            <AvatarLetter />
          </div>

          <div>
            <CurrentLocation />
          </div>
        </div>
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
