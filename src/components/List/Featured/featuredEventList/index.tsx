import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';

import { useEvent } from '../../../../context/EventContext';
import FeaturedCard from '../../../atomsUi/featuredCard';
import { CityContext } from '../../../../context/cityContex';
import type { EventItem } from '../../../../types/EventType';

const MAX_CARDS = 5;

const FeaturedEventList: React.FC = () => {
  const { events = [] } = useEvent();
  const { city } = useContext(CityContext);
  const [featuredEvents, setFeaturedEvents] = useState<EventItem[]>([]);

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
    <Swiper
      modules={[Navigation, EffectCoverflow]}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView="auto" // auto permite que las laterales sean más pequeñas o invisibles
      navigation
      loop={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1,
        scale: 0.9, // las slides laterales se ven pequeñas
        slideShadows: false,
      }}
      initialSlide={3} // empieza con la primera centrada
      style={{ width: '63%' }}
    >
      {featuredEvents.map((event) => (
        <SwiperSlide
          key={event.id}
          style={{
            width: '385px',
            height: '450px',
            transition: 'transform 0.3s', // animación suave
          }}
        >
          <FeaturedCard item={event} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeaturedEventList;
