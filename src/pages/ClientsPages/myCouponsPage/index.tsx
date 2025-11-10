import { useState, useEffect } from 'react';
import ColoredText from '../../../components/coloredText/index';
import Header from '../../../components/header';
import CouponCard from '../../../components/couponCard';
import { getAllUserCoupons } from '../../../services/coupons';
import { supabase } from '../../../lib/supabaseClient';
import './style.css';
import type { UserCouponWithDetails } from '../../../services/coupons';

const MyCouponsPage = () => {
  const [coupons, setCoupons] = useState<UserCouponWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'used'>('active');

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const allCoupons = await getAllUserCoupons(user.id);
        setCoupons(allCoupons);
      }
      setLoading(false);
    };

    fetchCoupons();
  }, []);

  const categorizeCoupons = () => {
    const now = new Date();
    
    return {
      active: coupons.filter(coupon => {
        if (coupon.is_used || coupon.used_at) return false;
        if (coupon.coupons.expires_at) {
          return new Date(coupon.coupons.expires_at) > now;
        }
        return true;
      }),
      used: coupons.filter(coupon => coupon.is_used || coupon.used_at)
    };
  };

  const getFilteredCoupons = () => {
    const categorized = categorizeCoupons();
    return categorized[activeTab] || [];
  };

  const { active, used } = categorizeCoupons();

  return (
    <div className="my-coupons-page">
      <Header />
      <ColoredText text="Mis cupones" color="#FF0099" />
      
      {loading ? (
        <div className="loading-message">Cargando cupones...</div>
      ) : (
        <>
          <div className="coupon-tabs">
            <button 
              className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Disponibles ({active.length})
            </button>
            <button 
              className={`tab-button ${activeTab === 'used' ? 'active' : ''}`}
              onClick={() => setActiveTab('used')}
            >
              Usados ({used.length})
            </button>
          </div>

          <div className="coupons-grid">
            {getFilteredCoupons().length === 0 ? (
              <div className="empty-message">
                {activeTab === 'active' && 'No tienes cupones disponibles'}
                {activeTab === 'used' && 'No has usado ningún cupón'}
              </div>
            ) : (
              getFilteredCoupons().map((userCoupon) => {
                const coupon = userCoupon.coupons;
                const isUsed = userCoupon.is_used || !!userCoupon.used_at;
                
                return (
                  <CouponCard
                    key={userCoupon.id}
                    title={coupon.description}
                    code={coupon.code}
                    discount={coupon.value}
                    discountType={coupon.type as 'percent' | 'fixed'}
                    isUsed={isUsed}
                    isExpired={false}
                    usedAt={userCoupon.used_at}
                    expiresAt={coupon.expires_at}
                  />
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyCouponsPage;
