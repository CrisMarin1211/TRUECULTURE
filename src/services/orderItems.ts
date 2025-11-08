import { supabase } from '../lib/supabaseClient';
import type { EventActivity } from '../types/orderItemsType';

export const getEventActivity = async (): Promise<EventActivity[]> => {
  const { data, error } = await supabase
    .from('order_items')
    .select('item_name, quantity')
    .eq('item_type', 'event');

  if (error) {
    console.error('Error fetching event activity:', error);
    return [];
  }

  if (!data || data.length === 0) return [];

  const grouped: Record<string, number> = {};
  data.forEach((item) => {
    const name = item.item_name;
    const qty = item.quantity || 0;
    if (grouped[name]) {
      grouped[name] += qty;
    } else {
      grouped[name] = qty;
    }
  });

  const totalParticipants = Object.values(grouped).reduce((acc, qty) => acc + qty, 0);

  const activity: EventActivity[] = Object.entries(grouped).map(([name, participants], index) => ({
    eventLetter: String.fromCharCode(65 + index),
    eventName: name,
    participants,
    percent: totalParticipants ? (participants / totalParticipants) * 100 : 0,
  }));

  return activity;
};

export const getItemSummary = async (
  itemName: string,
): Promise<{ orders: number; revenue: number }> => {
  const { data, error } = await supabase
    .from('order_items')
    .select('quantity, total_price')
    .eq('item_name', itemName);

  if (error) {
    console.error('Error fetching item summary:', error);
    return { orders: 0, revenue: 0 };
  }

  if (!data || data.length === 0) return { orders: 0, revenue: 0 };

  const summary = data.reduce(
    (acc, item) => {
      acc.orders += item.quantity || 0;
      acc.revenue += item.total_price || 0;
      return acc;
    },
    { orders: 0, revenue: 0 },
  );

  return summary;
};