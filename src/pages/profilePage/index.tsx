import Header from '../../components/header';
import './style.css';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <Header />
      <div className="profile-content">
        <div className="profile-left">
          <div className="card">
            <div className="card-header">
              <img src="/icons/edit.png" alt="edit" className="edit-icon" />
            </div>
            <div className="profile-initials">AR</div>
            <hr className="divider" />
            <h2 className="profile-name">Alejandro Ramirez</h2>
            <p className="profile-email">AlejandroR@gmail.com</p>
          </div>
        </div>
        <div className="profile-right">
          <div className="card row-1">
            <div className="row-1-left">
              <img src="/images/trofeo.png" alt="preview" className="card-img" />
            </div>
            <div className="row-1-right"></div>
          </div>
          <div className="row-2">
            <div className="card small-card">
              <img src="/images/image1.png" alt="card" className="card-img" />
              <div className="card-text">{/* Texto futuro */}</div>
            </div>
            <div className="card small-card">
              <div className="card-text">{/* Texto futuro */}</div>
            </div>
            <div className="card small-card">
              <img src="/images/image2.png" alt="card" className="card-img" />
              <div className="card-text">{/* Texto futuro */}</div>
            </div>
            <div className="card small-card">
              <div className="card-text">{/* Texto futuro */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
