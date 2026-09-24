'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'luckcookies_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // تحميل السلة المحفوظة من المتصفح عند فتح الموقع
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const savedItems = JSON.parse(saved);
        queueMicrotask(() => setItems(savedItems));
      } catch (e) {
        console.error('خطأ بقراءة السلة المحفوظة', e);
      }
    }
    queueMicrotask(() => setLoaded(true));
  }, []);

  // حفظ السلة بالمتصفح كل ما تتغير (بعد أول تحميل فقط)
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, loaded]);

  // priceOption = { id, product_id, pieces, size, price }
  function addToCart(product, priceOption, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((item) => item.priceId === priceOption.id);
      if (existing) {
        return prev.map((item) =>
          item.priceId === priceOption.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          priceId: priceOption.id,
          productId: product.id,
          name: product.name,
          image: product.image_url,
          pieces: priceOption.pieces,
          size: priceOption.size,
          unitPrice: priceOption.price,
          quantity,
        },
      ];
    });
  }

  function updateQuantity(priceId, quantity) {
    if (quantity <= 0) {
      removeFromCart(priceId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.priceId === priceId ? { ...item, quantity } : item))
    );
  }

  function removeFromCart(priceId) {
    setItems((prev) => prev.filter((item) => item.priceId !== priceId));
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart لازم تستخدميها جوا CartProvider');
  }
  return ctx;
}
