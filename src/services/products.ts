import { supabase } from '../lib/supabaseClient';
import type { ProductItem, ProductTagStats } from '../types/ProductType';
import { fetchOrganization } from './organization';

export const getProducts = async (): Promise<ProductItem[]> => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data ?? [];
};

export const getProductsByOrganization = async (organization?: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('organization', organization);

  if (error) throw error;
  return data;
};

export const addProduct = async (product: Omit<ProductItem, 'id'>): Promise<ProductItem[]> => {
  const { data, error } = await supabase.from('products').insert([product]).select('*');
  if (error) throw error;
  return data ?? [];
};

export const updateProduct = async (
  id: number,
  updates: Partial<ProductItem>,
): Promise<ProductItem[]> => {
  const { data, error } = await supabase.from('products').update(updates).eq('id', id).select('*');
  if (error) throw error;
  return data ?? [];
};

export const deleteProduct = async (id: number): Promise<ProductItem[]> => {
  const { data, error } = await supabase.from('products').delete().eq('id', id).select('*');
  if (error) throw error;
  return data ?? [];
};

export const getTotalProducts = async (organization: string): Promise<number> => {
  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('organization', organization);

  if (error) {
    console.error('Error al obtener total de productos:', error);
    return 0;
  }

  return count ?? 0;
};

export const getTotalProductViews = async (): Promise<number> => {
  const organization = await fetchOrganization();
  if (!organization) {
    console.error('No se pudo obtener la organización');
    return 0;
  }

  const { data, error } = await supabase
    .from('products')
    .select('views')
    .eq('organization', organization);

  if (error) {
    console.error('Error al obtener las vistas de productos:', error);
    return 0;
  }

  if (!data || data.length === 0) return 0;

  const totalViews = data.reduce((sum, p) => sum + (p.views || 0), 0);
  return totalViews;
};

export const getTopProductTags = async (): Promise<ProductTagStats[]> => {
  try {
    const organization = await fetchOrganization();
    if (!organization) throw new Error('No se encontró organización del usuario');

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('name, tags')
      .eq('organization', organization);

    if (productsError) throw productsError;
    if (!products?.length) return [];

    const productNames = products.map((p) => p.name);

    const { data: orderItems, error: orderError } = await supabase
      .from('order_items')
      .select('item_name, quantity')
      .in('item_name', productNames);

    if (orderError) throw orderError;
    if (!orderItems?.length) return [];

    const tagTotals: Record<string, number> = {};

    orderItems.forEach((order) => {
      const product = products.find((p) => p.name === order.item_name);
      const tag = product?.tags;
      const qty = order.quantity || 0;

      if (tag) {
        tagTotals[tag] = (tagTotals[tag] || 0) + qty;
      }
    });

    const total = Object.values(tagTotals).reduce((acc, val) => acc + val, 0);

    const tagStats: ProductTagStats[] = Object.entries(tagTotals).map(([tag, count]) => ({
      tag,
      count,
      percent: total ? (count / total) * 100 : 0,
    }));

    return tagStats.sort((a, b) => b.count - a.count).slice(0, 5);
  } catch (err) {
    console.error('Error procesando estadísticas de tags:', err);
    return [];
  }
};