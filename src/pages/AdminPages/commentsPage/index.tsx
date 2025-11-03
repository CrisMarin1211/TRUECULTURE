import { useEffect, useState } from 'react';
import './style.css';
import SidebarAdmin from '../../../components/atomsUi/sideBarAdmin';
import CommentCard from '../../../components/commentCard';
import { getCommentsByOrganization } from '../../../services/comments';
import type { CommentItem } from '../../../types/CommentType';
import Loader from '../../../components/loader';
import { supabase } from '../../../lib/supabaseClient';
import { getUserOrganizationByEmail } from '../../../services/users';

const ListCommentsPage: React.FC = () => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user?.email) {
          console.error('No se pudo obtener el usuario actual');
          return;
        }

        const organization = await getUserOrganizationByEmail(user.email);
        if (!organization) {
          console.error('No se encontró organización para este usuario');
          return;
        }

        const data = await getCommentsByOrganization(organization);
        setComments(data);
      } catch (error) {
        console.error('Error al obtener comentarios:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const filteredComments = comments.filter((c) => {
    const searchLower = search.toLowerCase();
    const comment = c.comment?.toLowerCase() ?? '';
    const author = c.author?.toLowerCase() ?? '';
    const relatedName = c.related_name?.toLowerCase() ?? '';

    const matchesSearch =
      comment.includes(searchLower) ||
      author.includes(searchLower) ||
      relatedName.includes(searchLower);

    const matchesType = filterType ? c.related_type === filterType : true;

    return matchesSearch && matchesType;
  });

  if (loading) return <Loader />;

  return (
    <div className="page-container">
      <SidebarAdmin />
      <main className="main-content">
        <div className="header-card">
          <div className="row row-1">
            <h4 className="title">Gestión de Reseñas</h4>
            <input
              type="text"
              placeholder="Buscar reseña..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="row row-2">
            <select
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Filtrar por tipo</option>
              <option value="product">Productos</option>
              <option value="event">Eventos</option>
            </select>
          </div>
        </div>

        <div className="comments-container">
          <div className="events-header">
            <h3>Reseñas de tu Organización</h3>
          </div>

          <div className="comments-grid">
            {filteredComments.length > 0 ? (
              filteredComments.map((c) => (
                <CommentCard
                  key={c.id}
                  title={c.related_name ?? '(Sin título)'}
                  comment={c.comment}
                  userName={c.author}
                  userAvatar="/images/default-avatar.jpg"
                  rating={c.rating}
                />
              ))
            ) : (
              <p className="no-results">No se encontraron reseñas.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListCommentsPage;
