import { supabase } from '../lib/supabaseClient';

export const getTotalSales = async (): Promise<string> => {
  const { data, error } = await supabase.from('orders').select('total');

  if (error) throw error;

  if (!data || data.length === 0) return '$0';

  const totalSales = data.reduce((acc, order) => acc + (order.total || 0), 0);

  const formattedTotal = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(totalSales);

  return formattedTotal;
};

export const getEventOrdersCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'event');

  if (error) throw error;

  return count || 0;
};

export const getProductsOrdersCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'product');

  if (error) throw error;

  return count || 0;
};