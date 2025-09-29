import React, { useContext, useState } from 'react';
import { useEvent } from '../../../../context/EventContext';
import CardClient from '../../../atomsUi/EventCard-Client/CardClient';
import { CityContext } from '../../../../context/cityContex';
import type { EventItem } from '../../../../types/EventType';
import { Dialog, Typography } from '@mui/material';
import ViewMore from '../../../viewMore/veiwMore';
import { useNavigate } from 'react-router-dom';

interface EventListProps {
  tag: EventItem['tags'];
}

const EventList: React.FC<EventListProps> = ({ tag }) => {
  const { events = [] } = useEvent();
  const { city } = useContext(CityContext);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const navigate = useNavigate();

  const filtered: EventItem[] = events.filter((e: EventItem) => e.tags === tag && e.city === city);

  if (!filtered.length) return null;

  return (
    <section>
      <h2>{tag}</h2>
      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
        {filtered.map((item: EventItem) => (
          <CardClient
            key={item.id}
            item={item}
            onViewMore={(event) => setSelectedEvent(event as EventItem)}
          />
        ))}
      </div>

      {/* 👇 Typography con navigate */}
      <Typography
        variant="body2"
        sx={{ cursor: 'pointer', marginTop: 1, color: 'primary.main' }}
        onClick={() => navigate(`/categories/${city}/${tag}`)}
      >
        Ver más
      </Typography>

      <Dialog
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        fullWidth
        maxWidth="md"
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        }}
      >
        {selectedEvent && <ViewMore item={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      </Dialog>
    </section>
  );
};

export default EventList;
