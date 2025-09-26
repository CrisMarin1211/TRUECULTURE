import React, { useContext, useEffect, useState } from 'react';
import { useEvent } from '../../../context/EventContext';
import FeaturesClient from '../../FeaturedCard/FeaturedCard';
import { CityContext } from '../../../context/CityContex';
import type { EventItem } from '../../../types/EventType';

const MAX_CARDS = 5;

const FeaturesEventList: React.FC = () => {
  const { events = [] } = useEvent();
  const { city } = useContext(CityContext);
  const [featuredEvents, setFeaturedEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    // Filtramos por ciudad y popularidad
    const filtered = events.filter(
      (event: EventItem) => event.city === city && event.popularity === 'Alta',
    );

    // Mezclamos y tomamos los primeros MAX_CARDS
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, MAX_CARDS);

    setFeaturedEvents(selected);
  }, [city, events]);

  if (featuredEvents.length === 0) {
    return (
      <p style={{ textAlign: 'center', marginTop: '2rem', color: 'white' }}>
        No hay eventos destacados en {city}.
      </p>
    );
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      {featuredEvents.map((event) => (
        <FeaturesClient key={event.id} item={event} />
      ))}
    </div>
  );
};

export default FeaturesEventList;
