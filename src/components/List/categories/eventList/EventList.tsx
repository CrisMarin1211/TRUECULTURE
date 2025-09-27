import React, { useContext } from 'react';
import { useEvent } from '../../../../context/eventContext';
import CardClient from '../../../atomsUi/productCard-Client';
import { CityContext } from '../../../../context/cityContex';
import type { EventItem } from '../../../../types/eventType';

interface EventListProps {
  tag: EventItem['tags'];
}

const EventList: React.FC<EventListProps> = ({ tag }) => {
  const { events = [] } = useEvent();
  const { city } = useContext(CityContext);

  const filtered: EventItem[] = events.filter((e: EventItem) => e.tags === tag && e.city === city);

  if (!filtered.length) return null;

  return (
    <section>
      <h2>{tag}</h2>
      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
        {filtered.map((item: EventItem) => (
          <CardClient key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default EventList;
