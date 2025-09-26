import { useState } from 'react';
import './style.css';
import AvatarLetter from '../AvatarLetter/LetterAvatars';
import SideBar from '../UiAtoms/SideBar/SideBar';
import { styled } from '@mui/material/styles';

const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.4)', // semitransparente
  zIndex: 1000,
});

const SidebarContainer = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  zIndex: 1001,
});

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <header className="header">
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

      <div className="header-right">
        <img src="/icons/cart.png" alt="Carrito" className="icon cart-icon" />
        <AvatarLetter />
      </div>

      {/* Sidebar como modal */}
      {isSidebarOpen && (
        <>
          <Overlay onClick={toggleSidebar} />
          <SidebarContainer>
            <SideBar toggleSidebar={toggleSidebar} />
          </SidebarContainer>
        </>
      )}
    </header>
  );
};

export default Header;
