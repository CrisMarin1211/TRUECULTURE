import { supabase } from '../lib/supabaseClient';
import type { EventItem } from '../types/EventType';

export const getEvents = async (): Promise<EventItem[]> => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) {
    console.error('Error obteniendo eventos:', error);
    return [];
  }
  return data as EventItem[];
};

export const addEvent = async (event: Omit<EventItem, 'id'>): Promise<EventItem[] | null> => {
  const { data, error } = await supabase.from('events').insert(event).select();
  if (error) {
    console.error('Error agregando evento:', error);
    return null;
  }
  return data as EventItem[];
};

export const updateEvent = async (
  id: string,
  updates: Partial<EventItem>,
): Promise<EventItem[] | null> => {
  const { data, error } = await supabase.from('events').update(updates).eq('id', id).select();
  if (error) {
    console.error('Error actualizando evento:', error);
    return null;
  }
  return data as EventItem[];
};

export const deleteEvent = async (id: string): Promise<void> => {
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) {
    console.error('Error eliminando evento:', error);
  }
};
