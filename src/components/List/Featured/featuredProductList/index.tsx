import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import type { ProductItem } from '../../../../types/ProductType';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';

import { useProduct } from '../../../../context/ProductEvent';
import FeaturedCard from '../../../atomsUi/featuredCard/index';
import { CityContext } from '../../../../context/CityContext';
import { Dialog } from '@mui/material';
import ViewMore from '../../../viewMore/veiwMore';

import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

const MAX_CARDS = 5;

const FeaturedProductList: React.FC = () => {
  const { products = [] } = useProduct();
  const { city } = useContext(CityContext);
  const [featuredProducts, setFeaturedProducts] = useState<ProductItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

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
          depth: 200,
          modifier: 0.7,
          scale: 0.96,
          slideShadows: false,
        }}
        initialSlide={featuredProducts.length > 0 ? Math.floor(featuredProducts.length / 2) : 0}
        style={{ width: '100%' }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1.3,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 2.3,
            spaceBetween: 2,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 3.6,
            spaceBetween: 3,
          },
        }}
      >
        {featuredProducts.map((product) => (
          <SwiperSlide key={product.id} className="featured-slide">
            <FeaturedCard item={product} onViewMore={() => setSelectedProduct(product)} />
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
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        fullWidth
        maxWidth="md"
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        }}
      >
        {selectedProduct && (
          <ViewMore item={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </Dialog>
    </div>
  );
};

export default FeaturedProductList;
