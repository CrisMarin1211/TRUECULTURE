export interface CommentItem {
  id?: number;
  related_id: string;
  related_type: 'product' | 'event';
  comment: string;
  rating: number;
  author: string;
  created_at?: string;
  related_name?: string;
}
