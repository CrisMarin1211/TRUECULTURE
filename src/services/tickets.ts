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

export const getTicketsByOrganization = async (organization: string): Promise<TicketItem[]> => {
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('id')
    .eq('organization', organization);

  if (eventsError) {
    console.error('Error obteniendo eventos:', eventsError);
    throw eventsError;
  }

  if (!events || events.length === 0) {
    return [];
  }

  const eventIds = events.map((e) => e.id);

  const { data: tickets, error: ticketsError } = await supabase
    .from('tickets')
    .select('*')
    .in('event_id', eventIds);

  if (ticketsError) {
    console.error('Error obteniendo tickets:', ticketsError);
    throw ticketsError;
  }

  return tickets ?? [];
};
