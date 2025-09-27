import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeaturedEventList.css';

import { useProduct } from '../../../context/ProductEvent';
import FeaturesClient from '../../FeaturedCard/FeaturedCard';
import { CityContext } from '../../../context/CityContex';
import type { ProductItem } from '../../../types/ProductType';

const MAX_CARDS = 5;

const FeaturedProducttList: React.FC = () => {
  const { products = [] } = useProduct();
  const { city } = useContext(CityContext);
  const [featuredProducts, setFeaturedProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    const filtered = products.filter(
      (product: ProductItem) => product.city === city && product.popularity === 'Alta demanda',
    );

    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, MAX_CARDS);

    setFeaturedProducts(selected);
  }, [city, products]);

  if (featuredProducts.length === 0) {
    return (
      <p style={{ textAlign: 'center', marginTop: '2rem', color: 'white' }}>
        No hay eventos destacados en {city}.
      </p>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, EffectCoverflow]}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView="auto"
      navigation
      pagination={{ clickable: true }}
      coverflowEffect={{
        rotate: 0, // sin rotación lateral
        stretch: 0, // separación horizontal
        depth: 200, // profundidad (perspectiva)
        modifier: 1, // intensidad del efecto
        scale: 0.85, // escala de las tarjetas laterales
        slideShadows: false, // quita sombras si no quieres
      }}
      style={{ padding: '2rem', width: '100%' }}
    >
      {featuredProducts.map((product) => (
        <SwiperSlide
          key={product.id}
          style={{ width: '385px', height: '450px' }} // 👈 asegura que respete el tamaño de tu card
        >
          <FeaturesClient item={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeaturedProducttList;
