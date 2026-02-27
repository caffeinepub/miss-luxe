import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface CartItemCustomisation {
  giftMessage?: string;
  ribbonColor?: string;
  packagingStyle?: string;
  greetingCard?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customisation?: CartItemCustomisation;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number, customisation?: CartItemCustomisation) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getInitialCart(): CartItem[] {
  try {
    const stored = localStorage.getItem('miss-luxe-cart');
    if (stored) {
      return JSON.parse(stored) as CartItem[];
    }
  } catch {
    // ignore localStorage errors
  }
  return [];
}

function getItemPrice(item: CartItem): number {
  const base = item.price;
  const greetingCardExtra = item.customisation?.greetingCard ? 50 : 0;
  return (base + greetingCardExtra) * item.quantity;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(getInitialCart);

  useEffect(() => {
    try {
      localStorage.setItem('miss-luxe-cart', JSON.stringify(items));
    } catch {
      // ignore localStorage errors
    }
  }, [items]);

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'>, qty: number = 1, customisation?: CartItemCustomisation) => {
      setItems(prev => {
        const existing = prev.find(i => i.id === item.id);
        if (existing) {
          return prev.map(i =>
            i.id === item.id
              ? {
                  ...i,
                  quantity: i.quantity + qty,
                  customisation: customisation ?? i.customisation,
                }
              : i
          );
        }
        return [...prev, { ...item, quantity: qty, customisation }];
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.id !== id));
    } else {
      setItems(prev => prev.map(i => (i.id === id ? { ...i, quantity } : i)));
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + getItemPrice(item), 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
