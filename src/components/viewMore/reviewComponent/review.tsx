import { useState } from 'react';
import { Box, Typography, Avatar, Card, CardContent, Link } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import type { ReviewItem } from '../../../types/ReviewItem';
import { mockReviews } from '../../../data/mockReviews';
import theme from '../../../styles/theme';

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
            alignSelf: 'flex-start', // para que el icono quede al inicio del contenedor
          }}
        />
        <CardContent sx={{ p: 0, pl: 5 }}>
          {' '}
          {/* padding-left ajusta el comentario */}
          <Typography
            fontSize={16}
            color="text.primary"
            sx={{
              mb: 0.25,
              wordBreak: 'break-word',
              lineHeight: 1.2,
            }}
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
                  lineHeight: 1,
                  verticalAlign: 'middle',
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
            {review.name}
          </Typography>
        </CardContent>
      </Box>

      <Avatar
        src={review.avatar}
        alt={review.name}
        sx={{
          width: 80,
          height: 80,
          ml: 2,
          flexShrink: 0,
        }}
      />
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
