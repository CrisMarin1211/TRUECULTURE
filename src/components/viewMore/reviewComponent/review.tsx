import { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Card, CardContent, Link, Rating } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import theme from '../../../styles/theme';
import type { CommentItem } from '../../../types/CommentType';
import { addComment, getCommentsByItem } from '../../../services/comments';
import { supabase } from '../../../lib/supabaseClient';
import { getUserProfileByEmail } from '../../../services/users';

interface ReviewProps {
  relatedId: string;
  relatedType: 'product' | 'event';
}

const ReviewCard = ({ review, maxWords = 20 }: { review: CommentItem; maxWords?: number }) => {
  const [expanded, setExpanded] = useState(false);

  const truncate = (text: string) => {
    const words = text.split(' ');
    if (words.length <= maxWords || expanded) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.beige.main,
        minHeight: 100,
        borderRadius: 0.1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: 500,
        p: 1,
        boxShadow: 'none',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <FormatQuoteIcon
          sx={{
            color: theme.palette.pink.main,
            fontSize: 40,
            mb: 0.5,
            flexShrink: 0,
            transform: 'scaleX(-1)',
            alignSelf: 'flex-start',
          }}
        />
        <CardContent sx={{ p: 0, pl: 5 }}>
          <Typography
            fontSize={16}
            sx={{ mb: 0.25, wordBreak: 'break-word', lineHeight: 1.2, color: '#000000' }}
          >
            {truncate(review.comment)}{' '}
            {review.comment.split(' ').length > maxWords && (
              <Link
                component="button"
                variant="body2"
                sx={{
                  color: theme.palette.pink.main,
                  fontWeight: 500,
                  ml: 0.5,
                }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Ver menos' : 'Leer más...'}
              </Link>
            )}
          </Typography>

          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{ mt: 1, lineHeight: 1, color: theme.palette.background.default }}
          >
            {review.author || 'Anónimo'}
          </Typography>
        </CardContent>
      </Box>

      <Avatar
        src={''}
        alt={review.author || 'Anónimo'}
        sx={{ width: 60, height: 60, ml: 2, flexShrink: 0 }}
      />
    </Card>
  );
};

const Review = ({ relatedId, relatedType }: ReviewProps) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(3);
  const [reviews, setReviews] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>('Anónimo');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user?.email) return;

        const profile = await getUserProfileByEmail(user.email);
        if (profile?.name) setUserName(profile.name);
      } catch (err) {
        console.error('Error al obtener usuario:', err);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const fetchItemComments = async () => {
      const itemComments = await getCommentsByItem(relatedId, relatedType);
      setReviews(itemComments);
    };

    fetchItemComments();
  }, [relatedId, relatedType]);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    setLoading(true);

    await addComment({
      related_id: relatedId,
      related_type: relatedType,
      comment,
      rating: rating ?? 3,
      author: userName || 'Anónimo',
    });

    setComment('');
    setRating(3);

    const itemComments = await getCommentsByItem(relatedId, relatedType);
    setReviews(itemComments);

    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          maxWidth: 500,
        }}
      >
        <Rating value={rating} onChange={(_, value) => setRating(value)} sx={{ mb: 0.5 }} />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe tu comentario..."
          rows={3}
          style={{
            width: '100%',
            border: `1px solid ${theme.palette.pink.main}`,
            borderRadius: '4px',
            padding: '6px 8px',
            fontSize: '14px',
            resize: 'vertical',
            outline: 'none',
            backgroundColor: 'transparent',
            color: 'white',
          }}
        />

        <button
          disabled={comment.trim().length === 0 || loading}
          onClick={handleSubmit}
          style={{
            border: `1px solid ${theme.palette.pink.main}`,
            borderRadius: '4px',
            background: 'transparent',
            color: theme.palette.pink.main,
            padding: '6px 16px',
            cursor: comment.trim().length === 0 ? 'not-allowed' : 'pointer',
            fontWeight: 500,
            transition: '0.2s',
            alignSelf: 'flex-start',
            marginBottom: '45px',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = theme.palette.pink.light;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
        >
          Publicar
        </button>
      </Box>

      {reviews.map((rev) => (
        <ReviewCard key={rev.id ?? Math.random()} review={rev} />
      ))}
    </Box>
  );
};

export default Review;