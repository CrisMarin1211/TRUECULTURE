import './style.css';
import SidebarAdmin from '../../../components/atomsUi/sideBarAdmin';

const ProfileAdminPage: React.FC = () => {
  return (
    <div className="page-container">
      <SidebarAdmin />
      <main className="main-content">
        <div className="header-card">
          <h4 className="title">Configuración del Perfil</h4>

          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-info">
                <img
                  src="https://i.pravatar.cc/120?img=5"
                  alt="Usuario"
                  className="profile-avatar"
                />
                <div className="profile-texts">
                  <strong className="profile-name">Ana Perez</strong>
                  <span className="profile-org">
                    Organización: <span className="profile-org-name">Universidad</span>
                  </span>
                  <span className="profile-username">@anaperez</span>
                </div>
              </div>
              <button className="btn-save">Guardar cambios</button>
            </div>

            <form className="profile-form">
              <div className="grid-2">
                <div>
                  <label className="input-label">Nombre completo</label>
                  <input type="text" placeholder="Ana Perez" />
                </div>
                <div>
                  <label className="input-label">Nick name</label>
                  <input type="text" placeholder="anaperez" />
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label className="input-label">Género</label>
                  <input type="text" placeholder="Femenino" />
                </div>
                <div>
                  <label className="input-label">País</label>
                  <input type="text" placeholder="Colombia" />
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label className="input-label">Idioma</label>
                  <input type="text" placeholder="Español" />
                </div>
                <div>
                  <label className="input-label">Zona horaria</label>
                  <input type="text" placeholder="GMT-5 (Bogotá)" />
                </div>
              </div>

              <div className="checkbox-row">
                <label>
                  <input type="checkbox" defaultChecked /> Mi correo es{' '}
                  <span className="email">ana.perez@openai.com</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileAdminPage;
