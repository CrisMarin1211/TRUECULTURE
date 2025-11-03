import { supabase } from '../lib/supabaseClient';
import type { TicketItem } from '../types/TicketType';

export const getTickets = async (): Promise<TicketItem[]> => {
  const { data, error } = await supabase.from('tickets').select('*');
  if (error) throw error;
  return data ?? [];
};

export const addTicket = async (ticket: Omit<TicketItem, 'id'>): Promise<TicketItem[]> => {
  const { data, error } = await supabase.from('tickets').insert([ticket]).select('*');
  if (error) throw error;
  return data ?? [];
};

export const updateTicket = async (
  id: number,
  updates: Partial<TicketItem>,
): Promise<TicketItem[]> => {
  const { data, error } = await supabase.from('tickets').update(updates).eq('id', id).select('*');
  if (error) throw error;
  return data ?? [];
};

export const deleteTicket = async (id: number): Promise<TicketItem[]> => {
  const { data, error } = await supabase.from('tickets').delete().eq('id', id).select('*');
  if (error) throw error;
  return data ?? [];
};
