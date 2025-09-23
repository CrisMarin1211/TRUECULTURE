import './style.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/icons/burger-icon.png" alt="Menu" className="icon menu-icon" />
      </div>

      <div className="header-center">
        <img src="/images/full-logo.png" alt="Logo" className="logo" />
      </div>

      <div className="header-right">
        <img src="/icons/card-icon.png" alt="Carrito" className="icon cart-icon" />
        <div className="avatar-container">
          <img src="/images/home3.png" alt="Usuario" className="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
