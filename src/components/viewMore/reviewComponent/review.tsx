import { useState } from 'react';
import { Box, Typography, Avatar, Card, CardContent, Link } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import type { ReviewItem } from '../../../types/ReviewItem';
import { mockReviews } from '../../../data/mockReviews';

interface ReviewProps {
  review: ReviewItem;
  maxWords?: number;
}

const ReviewCard = ({ review, maxWords = 20 }: ReviewProps) => {
  const [expanded, setExpanded] = useState(false);

  const truncate = (text: string) => {
    const words = text.split(' ');
    if (words.length <= maxWords || expanded) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <Card
      sx={{
        backgroundColor: '#fbeee6',
        borderRadius: '16px',
        p: 2,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        maxWidth: 500,
      }}
    >
      <FormatQuoteIcon sx={{ color: '#e91e63', fontSize: 40 }} />

      <CardContent sx={{ flex: 1, p: 0 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {truncate(review.comment)}{' '}
          {review.comment.split(' ').length > maxWords && (
            <Link
              component="button"
              variant="body2"
              sx={{ color: '#e91e63', fontWeight: 500 }}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Ver menos' : 'Leer más...'}
            </Link>
          )}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Avatar src={review.avatar} alt={review.name} />
          <Typography variant="subtitle1" fontWeight="bold">
            {review.name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const Review = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {mockReviews.map((rev) => (
        <ReviewCard key={rev.id} review={rev} />
      ))}
    </Box>
  );
};

export default Review;
