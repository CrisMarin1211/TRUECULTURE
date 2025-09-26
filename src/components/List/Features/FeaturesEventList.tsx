import React, { useContext, useEffect, useState } from 'react';
import { useEvent } from '../../../context/EventContext';
import FeaturesClient from '../../FeaturedCard/FeaturedCard';
import { CityContext } from '../../../context/CityContex';
import type { EventItem } from '../../../types/EventType';

const MAX_CARDS = 5;

const FeaturesEventList: React.FC = () => {
  const { events = [] } = useEvent();
  const { city } = useContext(CityContext);
  const [randomEvents, setRandomEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const filtered = events.filter(
      (event: EventItem) => event.city === city && event.popularity === 'Alta',
    );

    const shuffled = filtered.sort(() => 0.5 - Math.random());

    const selected = shuffled.slice(0, MAX_CARDS);

    setRandomEvents(selected);
  }, [city, events]);

  if (randomEvents.length === 0) {
    return <p>No hay eventos destacados en {city}.</p>;
  }

  return (
    <div>
      {randomEvents.map((item) => (
        <FeaturesClient key={item.id} item={item} />
      ))}
    </div>
  );
};

export default FeaturesEventList;
