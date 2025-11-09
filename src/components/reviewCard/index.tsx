import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';

interface ReviewCardProps {
  title?: string;
  averageRating: number;
  reviewsCountByRating: { rating: number; count: number }[];
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  title = 'Reseña de clientes',
  averageRating,
  reviewsCountByRating,
}) => {
  const data = [5, 4, 3, 2, 1].map((r) => ({
    rating: String(r),
    count: reviewsCountByRating.find((d) => d.rating === r)?.count || 0,
  }));

  const totalReviews = data.reduce((acc, d) => acc + d.count, 0);

  const renderLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    const percent = totalReviews > 0 ? ((value / totalReviews) * 100).toFixed(0) : '0';
    return (
      <text
        x={x + width + 8}
        y={y + height / 2 + 4}
        fill="#fff"
        fontSize={12}
      >{`${value} (${percent}%)`}</text>
    );
  };

  return (
    <Card
      sx={{
        backgroundColor: '#232323',
        color: 'white',
        borderRadius: '16px',
        border: '1px solid #666',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        height: '100%',
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" sx={{ color: '#ccc', mb: 1 }}>
          {title}
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <Typography variant="h5" sx={{ color: '#99CB36', fontWeight: 'bold', mr: 1 }}>
            {averageRating.toFixed(1)}
          </Typography>
          {[1, 2, 3, 4, 5].map((i) =>
            i <= Math.round(averageRating) ? (
              <FavoriteIcon key={i} sx={{ color: '#FF0099' }} />
            ) : (
              <FavoriteBorderIcon key={i} sx={{ color: '#555' }} />
            ),
          )}
        </div>

        <div style={{ width: '100%', height: 125 }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 60, left: 0}}
              barSize={20}
            >
              <YAxis
                dataKey="rating"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#ccc', fontSize: 14 }}
                width={30}
                interval={0}
              />
              <XAxis type="number" hide />
              <Tooltip
                cursor={{ fill: 'rgba(44, 34, 34, 0.05)' }}
                contentStyle={{ background: '#222', color: '#fff' }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} fill="#1177F1">
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill="#1177F1" />
                ))}
                <LabelList dataKey="count" content={renderLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;