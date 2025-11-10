import { supabase } from '../lib/supabaseClient';

export interface Seat {
  id: number;
  seat_number: string;
  is_reserved: boolean;
  reserved_by_profile_id?: number | null;
}

export const getEventSeats = async (eventId: number): Promise<Seat[]> => {
  const { data, error } = await supabase
    .from('event_seats')
    .select('id, seat_number, is_reserved, reserved_by_profile_id')
    .eq('event_id', eventId)
    .order('seat_number', { ascending: true });

  if (error) {
    console.error('Error al obtener asientos:', error);
    return [];
  }

  return (data || []) as Seat[];
};

export const reserveSeats = async (
  eventId: number,
  seatNumbers: string[],
  profileId: number
): Promise<boolean> => {
  const { error } = await supabase
    .from('event_seats')
    .update({
      is_reserved: true,
      reserved_by_profile_id: profileId,
      reserved_at: new Date().toISOString(),
    })
    .eq('event_id', eventId)
    .in('seat_number', seatNumbers)
    .eq('is_reserved', false);

  if (error) {
    console.error('Error al reservar asientos:', error);
    return false;
  }

  await supabase
    .from('events')
    .update({ availableseats: seatNumbers.length })
    .eq('id', eventId);

  return true;
};

