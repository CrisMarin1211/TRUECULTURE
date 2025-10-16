import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface CartItem {
  id: string | number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Purchase {
  id: string;
  title: string;
  image: string;
  type: string;
  date: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  finalizePurchase: () => boolean;
  subtotal: number;
  discount: number;
  total: number;
  setDiscount: (discount: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error al cargar carrito desde localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeFromCart = (id: string | number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    localStorage.removeItem('cart');
  };

  const finalizePurchase = (): boolean => {
    // <--- retorno explícito
    if (cartItems.length === 0) return false;

    const existingPurchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    const newPurchases: Purchase[] = cartItems.map((item) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: item.title,
      image: item.image,
      description: `Compraste ${item.quantity} unidad${item.quantity > 1 ? 'es' : ''}.`,
      type: 'Producto',
      date: new Date().toLocaleDateString('es-CO'),
    }));
    localStorage.setItem('purchases', JSON.stringify([...existingPurchases, ...newPurchases]));
    clearCart();
    return true; // <--- Ahora retorna un booleano usable
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = Math.max(subtotal - discount, 0);

  const value: CartContextType = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    finalizePurchase,
    subtotal,
    discount,
    total,
    setDiscount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};
