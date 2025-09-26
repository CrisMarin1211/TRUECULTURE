import './style.css';
import AvatarLetter from '../AvatarLetter/LetterAvatars';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/icons/menu.png" alt="Menu" className="icon menu-icon" />
      </div>

      <div className="header-center">
        <img src="/images/full-logo.png" alt="Logo" className="logo" />
      </div>

      <div className="header-right">
        <img src="/icons/cart.png" alt="Carrito" className="icon cart-icon" />
        <AvatarLetter />
      </div>
    </header>
  );
};

export default Header;
