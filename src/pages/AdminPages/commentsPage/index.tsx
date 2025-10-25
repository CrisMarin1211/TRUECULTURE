import { useEffect, useState } from 'react';
import './style.css';
import SidebarAdmin from '../../../components/atomsUi/sideBarAdmin';
import CommentCard from '../../../components/commentCard';
import { getComments } from '../../../services/comments';
import type { CommentItem } from '../../../types/CommentType';

const ListCommentsPage: React.FC = () => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments();
      setComments(data);
    };
    fetchComments();
  }, []);

  const filteredComments = comments.filter(
    (c) =>
      c.comment.toLowerCase().includes(search.toLowerCase()) ||
      c.related_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.author.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="page-container">
      <SidebarAdmin />
      <main className="main-content">
        <div className="header-card">
          <div className="row row-1">
            <h4 className="title">Gestión de Reseñas</h4>
            <input
              type="text"
              placeholder="Buscar..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="row row-2">
            <select className="filter-select">
              <option value="">Filtrar por tipo</option>
              <option value="product">Productos</option>
              <option value="event">Eventos</option>
            </select>
          </div>
        </div>

        <div className="comments-container">
          <div className="comments-grid">
            {filteredComments.map((c) => (
              <CommentCard
                key={c.id}
                title={c.related_name ?? '(Sin título)'}
                comment={c.comment}
                userName={c.author}
                userAvatar="/images/default-avatar.jpg"
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
