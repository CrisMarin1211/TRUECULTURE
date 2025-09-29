import { useParams } from 'react-router-dom';
import { useEvent } from '../../../context/EventContext';
import { CityContext } from '../../../context/cityContex';
import { useContext, useState } from 'react';
import CardClient from '../../../components/atomsUi/EventCard-Client/CardClient';
import type { EventItem } from '../../../types/EventType';
import type { ProductItem } from '../../../types/ProductType';
import Header from '../../../components/header';
import { Dialog } from '@mui/material';
import ViewMore from '../../../components/viewMore/veiwMore';

const Categories = () => {
  const { tag } = useParams<{ tag: string }>();
  const { city } = useContext(CityContext);
  const { events = [] } = useEvent();

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const filtered = events.filter((e: EventItem | ProductItem) => e.city === city && e.tags === tag);

  return (
    <>
      <Header />
      <section style={{ padding: '2rem 0' }}>
        {/* Título */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <h1
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 900,
              fontSize: '40px',
              textAlign: 'center',
            }}
          >
            {tag}
          </h1>
        </div>

        {/* Cards */}
        <div
          style={{
            margin: '2rem auto',
            width: '90%',
            maxWidth: '1200px',
          }}
        >
          {filtered.length ? (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
              }}
            >
              {filtered.map((item: EventItem) => (
                <CardClient
                  key={item.id}
                  item={item}
                  onViewMore={(event) => setSelectedEvent(event as EventItem)}
                />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center' }}>No hay eventos en esta categoría.</p>
          )}
        </div>

        {/* Modal */}
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
          {selectedEvent && (
            <ViewMore item={selectedEvent} onClose={() => setSelectedEvent(null)} />
          )}
        </Dialog>
      </section>
    </>
  );
};

export default Categories;
