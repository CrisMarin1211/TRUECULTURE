import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import type { EventItem } from '../../../../types/EventType';

interface EventCardProps {
  event: EventItem;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const soldSeats = event.totalSeats - event.availableSeats;

  return (
    <Card>
      <CardMedia component="img" image={event.image} alt={event.name} />
      <CardContent>
        <Typography>{event.name}</Typography>
        <Typography>
          {event.date} {event.time}
        </Typography>
        <Typography>{event.location}</Typography>
        <Typography>${event.price}</Typography>
        <Typography>Boletos vendidos: {soldSeats}</Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;
