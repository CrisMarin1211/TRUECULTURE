import { supabase } from '../lib/supabaseClient';
import type { Database } from '../types/supabase';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];

export interface OrderWithItems extends Order {
  order_items: OrderItem[];
  profiles?: {
    name: string | null;
    email: string;
  };
}

export interface CreateOrderParams {
  user_id: string;
  items: Array<{
    type: 'product' | 'event';
    id: number;
    name: string;
    price: number;
    quantity: number;
    seats?: string[]; 
  }>;
  coupon_code?: string;
  payment_status?: string;
  shipping_address?: string;
}

export const createOrder = async (params: CreateOrderParams): Promise<OrderWithItems | null> => {
  try {
    const { data, error } = await supabase.functions.invoke('process-purchase', {
      body: params,
    });

    if (error) {
      console.error('Error al procesar la compra:', error);
      return null;
    }

 
    if (data && data.order) {
      return data.order as OrderWithItems;
    }

    return null;
  } catch (error) {
    console.error('Error al crear la orden:', error);
    return null;
  }
};

export const getUserOrders = async (userId: string): Promise<OrderWithItems[]> => {
 
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (profileError || !profile) {
    console.error('Error al obtener el perfil:', profileError);
    return [];
  }


  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*),
      profiles!orders_profile_id_fkey (name, email)
    `)
    .eq('profile_id', profile.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener las órdenes:', error);
    return [];
  }

  return (data || []) as OrderWithItems[];
};

export const getOrderById = async (orderId: number): Promise<OrderWithItems | null> => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*),
      profiles!orders_profile_id_fkey (name, email)
    `)
    .eq('id', orderId)
    .single();

  if (error) {
    console.error('Error al obtener la orden:', error);
    return null;
  }

  return data as OrderWithItems;
};

