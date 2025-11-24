import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './featured.css';

import { useEvent } from '../../../../context/EventContext';
import FeaturedCard from '../../../atomsUi/featuredCard';
import { CityContext } from '../../../../context/CityContext';
import type { EventItem } from '../../../../types/EventType';
import { Dialog } from '@mui/material';
import ViewMore from '../../../viewMore/veiwMore';

import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

const MAX_CARDS = 5;

const FeaturedEventList: React.FC = () => {
  const { events = [] } = useEvent();
  const { city } = useContext(CityContext);
  const [featuredEvents, setFeaturedEvents] = useState<EventItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    const filtered = events.filter(
      (event: EventItem) => event.city === city && event.popularity === 'Alta',
    );

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
    <div style={{ position: 'relative' }}>
      <Swiper
        modules={[Navigation, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 0.7,
          scale: 0.95,
          slideShadows: false,
        }}
        initialSlide={featuredEvents.length > 0 ? Math.floor(featuredEvents.length / 2) : 0}
        style={{ width: '100%' }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1.2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
      >
        {featuredEvents.map((event) => (
          <SwiperSlide key={event.id} className="featured-slide">
            <FeaturedCard item={event} onViewMore={() => setSelectedEvent(event)} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-prev">
        <ArrowBackTwoToneIcon fontSize="medium" />
      </div>
      <div className="custom-next">
        <ArrowForwardTwoToneIcon fontSize="medium" />
      </div>

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
    </div>
  );
};

export default FeaturedEventList;
