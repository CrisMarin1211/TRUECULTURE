import { supabase } from '../lib/supabaseClient';
import type { ProductItem } from '../types/ProductType';

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
