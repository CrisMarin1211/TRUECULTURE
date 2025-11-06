import { supabase } from '../lib/supabaseClient';
import type { EventItem } from '../types/EventType';

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

export const updateEvent = async (id: string, event: EventItem) => {
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
