import { useEffect, useState } from 'react';
import Header from '../../../components/header';
import { supabase } from '../../../lib/supabaseClient';
import { getCommentsByUserName } from '../../../services/comments';
import type { UserProfile } from '../../../types/UserType';
import type { CommentItem } from '../../../types/CommentType';
import './style.css';
import { getUserProfileByEmail } from '../../../services/users';
import Loader from '../../../components/loader';

const MyReviewsPage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const { data: auth } = await supabase.auth.getUser();
      const email = auth?.user?.email;

      if (!email) {
        setLoading(false);
        return;
      }

      const userProfile = await getUserProfileByEmail(email);
      setProfile(userProfile);

      const username = userProfile?.name;

      if (!username) {
        setLoading(false);
        return;
      }

      const userComments = await getCommentsByUserName(username);
      setComments(userComments);

      setLoading(false);
    };

    loadData();
  }, []);

  if (loading || !profile) return <Loader />;

  return (
    <div className="my-reviews-page">
      <Header />

      <div className="reviews-container">
        <h1 className="reviews-title">Mis Reseñas</h1>

        <p className="reviews-username">
          Usuario: <strong>{profile.name}</strong>
        </p>

        {comments.length === 0 ? (
          <p>No has realizado reseñas aún.</p>
        ) : (
          <div className="reviews-list">
            {comments.map((c) => (
              <div key={c.id} className="review-card">
                <h3>{c.related_name ?? 'Item desconocido'}</h3>
                <p>{c.comment}</p>
                <span className="review-rating">⭐ {c.rating}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviewsPage;