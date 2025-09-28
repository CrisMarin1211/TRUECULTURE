import React, { useContext, useState } from 'react';
import { useEvent } from '../../../../context/EventContext';
import CardClient from '../../../atomsUi/EventCard-Client/CardClient';
import { CityContext } from '../../../../context/cityContex';
import type { EventItem } from '../../../../types/EventType';
import { Dialog } from '@mui/material';
import theme from '../../../../styles/theme';
import VeiwMoreEvents from '../../../viewMore/veiwMoreEvents';

interface EventListProps {
  tag: EventItem['tags'];
}

const EventList: React.FC<EventListProps> = ({ tag }) => {
  const { events = [] } = useEvent();
  const { city } = useContext(CityContext);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

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

      <Dialog
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
            padding: 2,
            backgroundColor: theme.palette.white.main,
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // oscuro con opacidad
          },
        }}
      >
        {selectedEvent && (
          <VeiwMoreEvents item={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </Dialog>
    </section>
  );
};

export default EventList;
