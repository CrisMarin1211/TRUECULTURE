import React, { useContext } from 'react';
import { useEvent } from '../../../context/EventContext';
import CardClient from '../../UiAtoms/ProductCard-Client/CardClient';
import { CityContext } from '../../../context/CityContex';
import type { EventItem } from '../../../types/EventType';

const TAGS: EventItem['tags'][] = ['Musica', 'Cultural', 'Familiar', 'Diversion', 'Gastronomia'];

const FeaturesEventList: React.FC = () => {
  const { events = [] } = useEvent();
  const { city } = useContext(CityContext);

  return (
    <div>
      {TAGS.map((tag) => {
        const filtered = events.filter((p) => p.tags === tag && p.city === city);
        if (filtered.length === 0) return null;

        return (
          <section key={tag}>
            <h2>{tag}</h2>
            <div>
              {filtered.map((item) => (
                <CardClient key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default FeaturesEventList;
