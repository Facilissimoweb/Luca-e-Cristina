import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "pizza-in-corso-cart";

function readCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    if (!Array.isArray(parsed)) {
      throw new TypeError("Il contenuto salvato del carrello non è valido.");
    }
    return parsed.filter(
      (item) =>
        typeof item.productId === "string" &&
        (item.format === "taglio" || item.format === "intera") &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch (error) {
    console.error("Impossibile leggere il carrello salvato.", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const addItem = (productId, format, quantity = 1) => {
      setItems((current) => {
        const key = `${productId}:${format}`;
        const existing = current.find((item) => `${item.productId}:${item.format}` === key);
        if (existing) {
          return current.map((item) =>
            `${item.productId}:${item.format}` === key
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [...current, { productId, format, quantity }];
      });
    };

    const setQuantity = (productId, format, quantity) => {
      setItems((current) =>
        quantity <= 0
          ? current.filter((item) => item.productId !== productId || item.format !== format)
          : current.map((item) =>
              item.productId === productId && item.format === format
                ? { ...item, quantity }
                : item,
            ),
      );
    };

    const clearCart = () => setItems([]);
    const count = items.reduce((total, item) => total + item.quantity, 0);

    return { items, addItem, setQuantity, clearCart, count };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve essere usato all'interno di CartProvider.");
  }
  return context;
}
