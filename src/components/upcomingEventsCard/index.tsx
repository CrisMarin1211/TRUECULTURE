import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

export interface UpcomingEvent {
  id: number;
  image: string;
  name: string;
  date: string;
}

interface UpcomingEventsCardProps {
  title?: string;
  events: UpcomingEvent[];
}

const UpcomingEventsCard: React.FC<UpcomingEventsCardProps> = ({
  title = 'Próximos Eventos',
  events,
}) => {
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
        <Typography variant="subtitle2" sx={{ color: '#ccc', mb: 2 }}>
          {title}
        </Typography>

        {events.map((event) => (
          <Box
            key={event.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 2,
              backgroundColor: '#2C2C2C',
              borderRadius: 2,
              padding: 1,
            }}
          >
            <Avatar
              src={event.image}
              alt={event.name}
              sx={{ width: 56, height: 56, marginRight: 2 }}
            />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {event.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                {event.date}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingEventsCard;