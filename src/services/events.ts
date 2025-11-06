import { supabase } from '../lib/supabaseClient';
import type { EventItem } from '../types/EventType';

export const addEvent = async (event: EventItem) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const getTotalEvents = async (): Promise<number> => {
  const { count, error } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true });

  if (error) throw error;

  return count || 0;
};
