export interface ProductItem {
  id?: number;
  image: string;
  imagefile?: File | null;
  name: string;
  price: number;
  description: string;
  location: string;
  address?: string;
  city?: 'Cali, Colombia' | 'Bogotá, Colombia';
  totalstock: number;
  availablestock: number;
  unitssaled: number;
  popularity?: 'Alta demanda' | 'Media demanda' | 'Baja demanda';
  tags?: 'Afiches' | 'Pines' | 'Cultural' | 'Moda' | 'Gastronomía';
  status: 'Activo' | 'No activo';
  isdraft?: boolean;
}

export interface ProductProviderProps {
  children: React.ReactNode;
}

export interface ProductContextType {
  products: ProductItem[];
  addProduct: (product: Omit<ProductItem, 'id'>) => Promise<void>;
  editProduct: (id: number, updates: Partial<ProductItem>) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
  updateStock: (id: number, stockTaken: number) => Promise<void>;
  saveProduct: (product: Omit<ProductItem, 'id'>) => Promise<void>;
}
