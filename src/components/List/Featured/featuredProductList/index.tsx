import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import type { ProductItem } from '../../../../types/ProductType';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useProduct } from '../../../../context/ProductEvent';
import FeaturedCard from '../../../atomsUi/featuredCard/index';
import { CityContext } from '../../../../context/cityContex';

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
        No hay productos destacados en {city}.
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
      {featuredProducts.map((product) => (
        <SwiperSlide
          key={product.id}
          style={{ width: '385px', height: '450px' }} // 👈 asegura que respete el tamaño de tu card
        >
          <FeaturedCard item={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeaturedProducttList;
