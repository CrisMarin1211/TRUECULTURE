import type { ProductItem } from './ProductType';
import type { EventItem } from './EventType';

export interface ViewMoreProps {
  item: EventItem | ProductItem;
  onClose: () => void;
  onPublicBuy?: (handleBuyOriginal: () => void) => void; // <-- NUEVA
}

