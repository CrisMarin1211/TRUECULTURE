import { useParams } from 'react-router-dom';
import { useEvent } from '../../../context/EventContext';
import { useProduct } from '../../../context/ProductEvent';
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
  const { products = [] } = useProduct();

  const [selectedItem, setSelectedItem] = useState<EventItem | ProductItem | null>(null);

  const combinedItems = [...events, ...products];

  const filtered = combinedItems.filter(
    (item: EventItem | ProductItem) => item.city === city && item.tags === tag,
  );

  return (
    <>
      <Header />
      <section style={{ padding: '2rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <h1
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 900,
              fontSize: '40px',
              textAlign: 'center',
              textTransform: 'capitalize',
            }}
          >
            {tag}
          </h1>
        </div>

        <div style={{ margin: '2rem auto', width: '90%', maxWidth: '1200px' }}>
          {filtered.length ? (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
              }}
            >
              {filtered.map((item) => (
                <CardClient key={item.id} item={item} onViewMore={(i) => setSelectedItem(i)} />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center' }}>No hay resultados en esta categoría.</p>
          )}
        </div>

        <Dialog
          open={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          fullWidth
          maxWidth="md"
          BackdropProps={{
            sx: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
          }}
        >
          {selectedItem && <ViewMore item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </Dialog>
      </section>
    </>
  );
};

export default Categories;
