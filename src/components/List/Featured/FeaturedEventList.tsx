import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeaturedEventList.css';

import { useEvent } from '../../../context/EventContext';
import FeaturedCard from '../../UiAtoms/FeaturedCard/FeaturedCard';
import { CityContext } from '../../../context/CityContex';
import type { EventItem } from '../../../types/EventType';

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
  slidesPerView="auto"       // auto permite que las laterales sean más pequeñas o invisibles
  navigation
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 200,
    modifier: 1,
    scale: 0.5,               // las slides laterales se ven pequeñas
    slideShadows: false,
  }}
  initialSlide={0}            // empieza con la primera centrada
  style={{ width: '80%' }}
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
