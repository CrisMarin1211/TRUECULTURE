import { supabase } from '../lib/supabaseClient';
import type { CommentItem } from '../types/CommentType';

export const addComment = async (
  comment: Omit<CommentItem, 'id' | 'created_at' | 'related_name'>,
): Promise<CommentItem[]> => {
  const { data, error } = await supabase.from('comments').insert([comment]).select();

  if (error) {
    console.error('Error al insertar comentario:', error);
    return [];
  }

  return data ?? [];
};

export const getComments = async (): Promise<CommentItem[]> => {
  const { data: comments, error } = await supabase.from('comments').select('*');

  if (error) {
    console.error('Error al obtener comentarios:', error);
    return [];
  }

  if (!comments || comments.length === 0) return [];

  const productIds = comments
    .filter((c) => c.related_type === 'product')
    .map((c) => Number(c.related_id))
    .filter((id) => !isNaN(id));

  const eventIds = comments
    .filter((c) => c.related_type === 'event')
    .map((c) => Number(c.related_id))
    .filter((id) => !isNaN(id));

  const productNames = new Map<number, string>();
  const eventNames = new Map<number, string>();

  if (productIds.length > 0) {
    const { data: products } = await supabase
      .from('products')
      .select('id, name')
      .in('id', productIds);

    products?.forEach((p) => productNames.set(p.id, p.name));
  }

  if (eventIds.length > 0) {
    const { data: events } = await supabase.from('events').select('id, name').in('id', eventIds);
    events?.forEach((e) => eventNames.set(e.id, e.name));
  }

  const mappedComments = comments.map((c) => ({
    ...c,
    related_name:
      c.related_type === 'product'
        ? productNames.get(Number(c.related_id))
        : eventNames.get(Number(c.related_id)),
  }));

  return mappedComments;
};
