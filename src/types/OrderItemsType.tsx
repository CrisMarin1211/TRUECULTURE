export interface EventActivity {
  eventLetter: string;
  eventName: string;
  participants: number;
  percent: number;
}

export interface EventSales {
  itemName: string;
  totalQuantity: number;
  totalPrice: number;
}

export interface OrderItem {
  id: number;
  order_id: number;
  item_type: 'product' | 'event';
  item_id: number;
  item_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  shipping_status: 'Pending' | 'In Transit' | 'Delivered' | null;
  created_at: string;
  updated_at: string | null;
}

export interface OrdersSummary {
  status: 'Pending' | 'In Transit' | 'Delivered';
  count: number;
  percent: number;
  total: number;
}