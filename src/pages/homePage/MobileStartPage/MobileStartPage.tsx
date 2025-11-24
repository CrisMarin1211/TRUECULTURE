import { useNavigate } from "react-router-dom";
import "./MobileStartPage.css";

const MobileStartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-start-page">
      <header className="mobile-header">
        <img src="/images/full-logo.png" alt="TrueCulture Logo" className="mobile-logo" />
      </header>

      <div className="mobile-curve">
      </div>

      <div className="mobile-buttons">
        <button className="btn-login" onClick={() => navigate("/login")}>
          Iniciar sesión
        </button>

        <button className="btn-register" onClick={() => navigate("/signup")}>
          Crear cuenta
        </button>
      </div>
    </div>
  );
};

export default MobileStartPage;
