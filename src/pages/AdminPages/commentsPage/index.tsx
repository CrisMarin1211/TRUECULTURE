import './style.css';
import SidebarAdmin from '../../../components/atomsUi/sideBarAdmin';
import CommentCard from '../../../components/commentCard';

const ListCommentsPage: React.FC = () => {
  const comments = [
    {
      id: 1,
      title: 'Concierto de Rock 2025',
      comment: 'Excelente experiencia, la organización fue impecable y el sonido espectacular.',
      userName: 'Pepita Perez',
      userAvatar: '/images/eve.jpg',
      rating: 1,
    },
    {
      id: 2,
      title: 'Camiseta edición limitada',
      comment: 'Muy buena calidad, llegó rápido y el diseño es increíble. Volveré a comprar.',
      userName: 'Carlos Ruiz',
      userAvatar: '/images/user1.jpg',
      rating: 4,
    },
    {
      id: 3,
      title: 'Festival Gastronómico',
      comment: 'La comida deliciosa, pero la logística pudo mejorar un poco en los horarios.',
      userName: 'Ana María',
      userAvatar: '/images/user2.jpg',
      rating: 3,
    },
  ];

  return (
    <div className="page-container">
      <SidebarAdmin />
      <main className="main-content">
        <div className="header-card">
          <div className="row row-1">
            <h4 className="title">Gestión de Reseñas</h4>
            <input type="text" placeholder="Buscar..." className="search-input" />
          </div>
          <div className="row row-2">
            <select className="filter-select">
              <option value="">Filtrar por estado</option>
              <option value="Proximos">Próximos</option>
              <option value="Pendiente">Pendientes</option>
              <option value="Finalizados">Finalizados</option>
            </select>
          </div>
        </div>

        <div className="comments-container">
          <div className="comments-grid">
            {comments.map((c) => (
              <CommentCard
                key={c.id}
                title={c.title}
                comment={c.comment}
                userName={c.userName}
                userAvatar={c.userAvatar}
                rating={c.rating}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListCommentsPage;
