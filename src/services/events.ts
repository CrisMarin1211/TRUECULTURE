import { supabase } from '../lib/supabaseClient';
import type { EventItem, UpcomingEvent } from '../types/EventType';
import { fetchOrganization } from './organization';

export const addEvent = async (event: EventItem) => {
  const { id, ...cleanEvent } = event;

  const { data, error } = await supabase.from('events').insert([cleanEvent]).select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const getEvents = async () => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) {
    throw error;
  }
  return data || [];
};

export const updateEvent = async (id: string, event: Partial<EventItem>) => {
  const { data, error } = await supabase
    .from('events')
    .update(event)
    .eq('id', Number(id))
    .select('*');

  if (error) throw error;
  return data;
};

export const deleteEvent = async (id: string) => {
  const { data, error } = await supabase.from('events').delete().eq('id', Number(id)).select('*');

  if (error) throw error;
  return data;
};

export const getTotalEvents = async (organization: string): Promise<number> => {
  const { count, error } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('organization', organization);

  if (error) {
    console.error('Error al obtener total de eventos:', error);
    return 0;
  }

  return count ?? 0;
};

export const getEventsByOrganization = async (organization?: string) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('organization', organization);

  if (error) throw error;
  return data;
};

export const getUpcomingEvents = async (limit: number = 5): Promise<UpcomingEvent[]> => {
  const organization = await fetchOrganization();
  if (!organization) throw new Error('El usuario no tiene organización asociada');

  const { data, error } = await supabase
    .from('events')
    .select('id, image, name, date')
    .eq('organization', organization)
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error al obtener próximos eventos:', error);
    return [];
  }

  console.log('Upcoming events data:', data);
  return (
    data?.map((e) => ({
      id: e.id,
      image: e.image,
      name: e.name,
      date: e.date,
    })) || []
  );
};

export const getTotalEventViews = async (): Promise<number> => {
  const organization = await fetchOrganization();
  if (!organization) {
    console.error('No se pudo obtener la organización');
    return 0;
  }

  const { data, error } = await supabase
    .from('events')
    .select('views')
    .eq('organization', organization);

  if (error) {
    console.error('Error al obtener las vistas de eventos:', error);
    return 0;
  }

  if (!data || data.length === 0) return 0;

  const totalViews = data.reduce((sum, e) => sum + (e.views || 0), 0);
  return totalViews;
};