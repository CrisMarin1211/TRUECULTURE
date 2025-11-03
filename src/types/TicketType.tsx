export interface TicketItem {
  id?: number;
  customer_name: string;
  order_number: string;
  ticket_type: 'General' | 'VIP' | 'Backstage';
  quantity: number;
  payment_status: 'Pagado' | 'Pendiente' | 'Fallido';
  event_id: number;
  date: string;
  organization?: string;
}
