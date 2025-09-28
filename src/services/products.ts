import { supabase } from '../lib/supabaseClient';
import type { ProductItem } from '../types/ProductType';

export const getProducts = async (): Promise<ProductItem[]> => {
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }

  return data ?? [];
};

export const addProduct = async (product: Omit<ProductItem, 'id'>): Promise<ProductItem[]> => {
  const { data, error } = await supabase.from('products').insert([product]).select();

  if (error) {
    console.error('Error al insertar producto:', error);
    return [];
  }

  return data ?? [];
};

export const updateProduct = async (
  id: string,
  updates: Partial<ProductItem>,
): Promise<ProductItem[]> => {
  const { data, error } = await supabase.from('products').update(updates).eq('id', id).select();

  if (error) {
    console.error('Error al actualizar producto:', error);
    return [];
  }

  return data ?? [];
};

export const deleteProduct = async (id: string): Promise<ProductItem[]> => {
  const { data, error } = await supabase.from('products').delete().eq('id', id).select();

  if (error) {
    console.error('Error al eliminar producto:', error);
    return [];
  }

  return data ?? [];
};
