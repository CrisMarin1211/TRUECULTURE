import type { ProductItem } from './ProductType';
import type { EventItem } from './EventType';

export interface ViewMoreProps {
  item: ProductItem | EventItem;
  onClose: () => void;
}
