import { supabase } from '../lib/supabaseClient';
import type { EventActivity, OrderItem, OrdersSummary } from '../types/OrderItemsType';
import { fetchOrganization } from './organization';

export const getEventActivity = async (): Promise<EventActivity[]> => {
  const organization = await fetchOrganization();
  if (!organization) throw new Error('El usuario no tiene organización asociada');

  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('name')
    .eq('organization', organization);

  if (eventsError) throw eventsError;
  if (!events?.length) return [];

  const eventNames = events.map((e) => e.name);

  const { data, error } = await supabase
    .from('order_items')
    .select('item_name, quantity')
    .in('item_name', eventNames);

  if (error) {
    console.error('Error fetching event activity:', error);
    return [];
  }

  if (!data?.length) return [];

  const grouped: Record<string, number> = {};
  data.forEach((item) => {
    const name = item.item_name;
    const qty = item.quantity || 0;
    grouped[name] = (grouped[name] || 0) + qty;
  });

  const totalParticipants = Object.values(grouped).reduce((acc, qty) => acc + qty, 0);

  return Object.entries(grouped).map(([name, participants], index) => ({
    eventLetter: String.fromCharCode(65 + index),
    eventName: name,
    participants,
    percent: totalParticipants ? (participants / totalParticipants) * 100 : 0,
  }));
};

export const getItemSummary = async (
  itemName: string,
): Promise<{ orders: number; revenue: number }> => {
  const organization = await fetchOrganization();
  if (!organization) throw new Error('El usuario no tiene organización asociada');

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('name')
    .eq('organization', organization)
    .eq('name', itemName)
    .single();

  if (productError || !product) {
    console.warn(El producto ${itemName} no pertenece a la organización);
    return { orders: 0, revenue: 0 };
  }

  const { data, error } = await supabase
    .from('order_items')
    .select('quantity, total_price')
    .eq('item_name', itemName);

  if (error) {
    console.error('Error fetching item summary:', error);
    return { orders: 0, revenue: 0 };
  }

  if (!data?.length) return { orders: 0, revenue: 0 };

  return data.reduce(
    (acc, item) => {
      acc.orders += item.quantity || 0;
      acc.revenue += item.total_price || 0;
      return acc;
    },
    { orders: 0, revenue: 0 },
  );
};

export const getOrdersByOrganization = async (): Promise<OrderItem[]> => {
  const organization = await fetchOrganization();
  if (!organization) throw new Error('El usuario no tiene organización asociada');

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name')
    .eq('organization', organization);

  if (productsError) throw productsError;

  const productNames = products.map((p) => p.name);

  const { data: orderItems, error: orderItemsError } = await supabase
    .from('order_items')
    .select('id, item_name, quantity, total_price, shipping_status, created_at, updated_at')
    .in('item_name', productNames);

  if (orderItemsError) throw orderItemsError;

  return orderItems as OrderItem[];
};

export const updateShippingStatus = async (
  id: number,
  status: 'Pending' | 'In Transit' | 'Delivered',
): Promise<void> => {
  const { error } = await supabase
    .from('order_items')
    .update({
      shipping_status: status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw error;
};

export const getEventOrdersCount = async (): Promise<number> => {
  const organization = await fetchOrganization();
  if (!organization) throw new Error('El usuario no tiene organización asociada');

  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('name')
    .eq('organization', organization);

  if (eventsError) throw eventsError;
  if (!events?.length) return 0;

  const eventNames = events.map((e) => e.name);

  const { data, error } = await supabase
    .from('order_items')
    .select('quantity')
    .in('item_name', eventNames);

  if (error) throw error;

  const total = data?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  return total;
};

export const getProductsOrdersCount = async (): Promise<number> => {
  const organization = await fetchOrganization();
  if (!organization) throw new Error('El usuario no tiene organización asociada');

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('name')
    .eq('organization', organization);

  if (productsError) throw productsError;
  if (!products?.length) return 0;

  const productNames = products.map((p) => p.name);

  const { data, error } = await supabase
    .from('order_items')
    .select('quantity')
    .in('item_name', productNames);

  if (error) throw error;

  const total = data?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  return total;
};

export const getTotalSalesByOrganization = async (): Promise<string> => {
  const organization = await fetchOrganization();
  if (!organization) throw new Error('El usuario no tiene organización asociada');

  const { data: items, error: itemsError } = await supabase
    .from('products')
    .select('name')
    .eq('organization', organization);

  if (itemsError) throw itemsError;
  if (!items?.length) return '$0';

  const itemNames = items.map((item) => item.name);

  const { data: orderItems, error: orderItemsError } = await supabase
    .from('order_items')
    .select('total_price')
    .in('item_name', itemNames);

  if (orderItemsError) throw orderItemsError;
  if (!orderItems?.length) return '$0';

  const totalSales = orderItems.reduce((acc, order) => acc + (order.total_price || 0), 0);

  const formattedTotal = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(totalSales);

  return formattedTotal;
};

export const getOrdersSummary = async (): Promise<OrdersSummary[]> => {
  const organization = await fetchOrganization();
  if (!organization) throw new Error('El usuario no tiene organización asociada');

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('name')
    .eq('organization', organization);

  if (productsError) throw productsError;
  if (!products?.length) return [];

  const productNames = products.map((p) => p.name);

  const { data: orders, error: ordersError } = await supabase
    .from('order_items')
    .select('shipping_status, quantity')
    .in('item_name', productNames)
    .eq('item_type', 'product');

  if (ordersError) throw ordersError;
  if (!orders?.length) return [];

  const summary = {
    Pending: 0,
    'In Transit': 0,
    Delivered: 0,
  };

  orders.forEach((order) => {
    const status = order.shipping_status || 'Pending';
    const qty = order.quantity || 0;
    if (summary[status as keyof typeof summary] !== undefined) {
      summary[status as keyof typeof summary] += qty;
    }
  });

  const total = Object.values(summary).reduce((a, b) => a + b, 0);

  const result: OrdersSummary[] = (
    Object.entries(summary) as [OrdersSummary['status'], number][]
  ).map(([status, count]) => ({
    status,
    count,
    total,
    percent: total ? (count / total) * 100 : 0,
  }));

  return result;
};

export const getProductsStatusList = async () => {
  const organization = await fetchOrganization();
  if (!organization) throw new Error('El usuario no tiene organización asociada');

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name, city')
    .eq('organization', organization);

  if (productsError) throw productsError;
  if (!products?.length) return [];

  const productNames = products.map((p) => p.name);

  const { data: orderItems, error: orderItemsError } = await supabase
    .from('order_items')
    .select('id, item_name, created_at, shipping_status')
    .in('item_name', productNames)
    .eq('item_type', 'product')
    .order('created_at', { ascending: false });

  if (orderItemsError) throw orderItemsError;
  if (!orderItems?.length) return [];

  const result = orderItems.map((order) => {
    const product = products.find((p) => p.name === order.item_name);

    return {
      id: order.id,
      name: order.item_name,
      city: product?.city || 'Sin ubicación',
      date: new Date(order.created_at).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: (order.shipping_status as 'Pending' | 'In Transit' | 'Delivered') || 'Pending',
    };
  });

  return result;
};