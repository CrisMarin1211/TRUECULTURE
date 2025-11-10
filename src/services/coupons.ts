import { supabase } from '../lib/supabaseClient';
import type { Database } from '../types/supabase';

type UserCoupon = Database['public']['Tables']['user_coupons']['Row'];
type Coupon = Database['public']['Tables']['coupons']['Row'];

export interface UserCouponWithDetails extends UserCoupon {
  coupons: Coupon;
}

export const getUserCoupons = async (userId: string, includeUsed: boolean = false): Promise<UserCouponWithDetails[]> => {

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (profileError || !profile) {
    console.error('Error al obtener el perfil:', profileError);
    return [];
  }

  let query = supabase
    .from('user_coupons')
    .select(`
      *,
      coupons (*)
    `)
    .eq('profile_id', profile.id);

 
  if (!includeUsed) {
    query = query.eq('is_used', false).is('used_at', null);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error al obtener los cupones del usuario:', error);
    return [];
  }

  return data || [];
};

export const getAllUserCoupons = async (userId: string): Promise<UserCouponWithDetails[]> => {
  return getUserCoupons(userId, true);
};

export const calculateCouponDiscount = (
  coupon: Coupon,
  subtotal: number
): number => {
  let discount = 0;

  
  if (coupon.min_purchase_amount && subtotal < coupon.min_purchase_amount) {
    return 0;
  }

 
  if (coupon.type === 'percent') {
    discount = subtotal * (coupon.value / 100);
  } else if (coupon.type === 'fixed') {
    discount = coupon.value;
  }

 
  if (coupon.max_discount_amount && discount > coupon.max_discount_amount) {
    discount = coupon.max_discount_amount;
  }

  return Math.min(discount, subtotal); 
};

