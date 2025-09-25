import React from 'react';
import { useEvent } from '../../../context/EventContext';
import CardClient from '../../UiAtoms/ProductCard-Client/CardClient';
import type { EventItem } from '../../../types/EventType';

const TAGS: EventItem['tags'][] = ['Musica', 'Cultural', 'Familiar', 'Diversion', 'Gastronomia'];

const ProductList: React.FC = () => {
  const { events = [] } = useEvent();

  return (
    <div>
      {TAGS.map((tag) => {
        const filtered = events.filter((p) => p.tags === tag);
        if (filtered.length === 0) return null;

        return (
          <section key={tag} style={{ marginBottom: 24 }}>
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

export default ProductList;
