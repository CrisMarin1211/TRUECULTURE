import { supabase } from '../lib/supabaseClient';
import type { CommentItem, ReviewsSummary } from '../types/CommentType';
import { fetchOrganization } from './organization';

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

export const getCommentsByOrganization = async (organization?: string): Promise<CommentItem[]> => {
  const { data: comments, error } = await supabase.from('comments').select('*');

  if (error) {
    console.error('Error al obtener comentarios:', error);
    return [];
  }

  if (!comments || comments.length === 0) return [];

  let productIds: number[] = [];
  let eventIds: number[] = [];

  if (organization) {
    const { data: products, error: prodError } = await supabase
      .from('products')
      .select('id')
      .eq('organization', organization);

    if (!prodError && products) {
      productIds = products.map((p) => p.id);
    }

    const { data: events, error: evtError } = await supabase
      .from('events')
      .select('id')
      .eq('organization', organization);

    if (!evtError && events) {
      eventIds = events.map((e) => e.id);
    }
  }

  const filteredComments = organization
    ? comments.filter(
        (c) =>
          (c.related_type === 'product' && productIds.includes(Number(c.related_id))) ||
          (c.related_type === 'event' && eventIds.includes(Number(c.related_id))),
      )
    : comments;

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

  const mappedComments = filteredComments.map((c) => ({
    ...c,
    related_name:
      c.related_type === 'product'
        ? productNames.get(Number(c.related_id))
        : eventNames.get(Number(c.related_id)),
  }));

  return mappedComments;
};

export const getReviewsSummary = async (): Promise<ReviewsSummary> => {
  const organization = await fetchOrganization();
  if (!organization) {
    console.warn('No se encontró organización para el usuario');
    return { averageRating: 0, reviewsCountByRating: [] };
  }

  const { data: products } = await supabase
    .from('products')
    .select('id')
    .eq('organization', organization);

  const { data: events } = await supabase
    .from('events')
    .select('id')
    .eq('organization', organization);

  const productIds = products?.map((p) => p.id) ?? [];
  const eventIds = events?.map((e) => e.id) ?? [];

  if (productIds.length === 0 && eventIds.length === 0) {
    return { averageRating: 0, reviewsCountByRating: [] };
  }

  const { data: comments, error } = await supabase
    .from('comments')
    .select('rating, related_type, related_id')
    .or(
      [
        productIds.length > 0
          ? `and(related_type.eq.product,related_id.in.(${productIds.join(',')}))`
          : '',
        eventIds.length > 0
          ? `and(related_type.eq.event,related_id.in.(${eventIds.join(',')}))`
          : '',
      ]
        .filter(Boolean)
        .join(','),
    );

  if (error) {
    console.error('Error al obtener ratings de la organización:', error);
    return { averageRating: 0, reviewsCountByRating: [] };
  }

  if (!comments || comments.length === 0) {
    return { averageRating: 0, reviewsCountByRating: [] };
  }

  const ratings = comments
    .map((c) => c.rating)
    .filter((r): r is number => typeof r === 'number' && r >= 1 && r <= 5);

  const averageRating =
    ratings.length > 0 ? ratings.reduce((acc, r) => acc + r, 0) / ratings.length : 0;

  const reviewsCountByRating = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: ratings.filter((r) => r === rating).length,
  }));

  return {
    averageRating,
    reviewsCountByRating,
  };
};

export const getCommentsByItem = async (
  relatedId: string,
  relatedType: 'product' | 'event',
): Promise<CommentItem[]> => {
  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .eq('related_id', relatedId)
    .eq('related_type', relatedType)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener comentarios del item:', error);
    return [];
  }

  return comments ?? [];
};