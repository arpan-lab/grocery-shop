/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import { getToken } from "../utils/auth"; // 👈 adjust if your auth util differs

export const CartContext = createContext();

// ✅ Import images
import milk from "../assets/milk.jpeg";
import bread from "../assets/bread.jpeg";
import eggs from "../assets/eggs.jpeg";
import salt from "../assets/salt.jpeg";
import maggie from "../assets/maggie.jpeg";
import cornflakes from "../assets/cornflakes.jpeg";
import tomato from "../assets/tomato.jpeg";
import oreo from "../assets/oreo.jpeg";
import bourboan from "../assets/bourboan.jpeg";
import mariegold from "../assets/mariegold.jpeg";
import onion from "../assets/onion.jpeg";
import garlic from "../assets/garlic.jpeg";
import darkfantasy from "../assets/darkfantasy.jpeg";
import dabur from "../assets/dabur.jpeg";
import indiagate from "../assets/indiagate.jpeg";
import closeup from "../assets/closeup.jpeg";

const fallbackImages = {
  milk,
  bread,
  eggs,
  salt,
  maggie,
  cornflakes,
  tomato,
  oreo,
  bourboan,
  mariegold,
  onion,
  garlic,
  darkfantasy,
  dabur,
  indiagate,
  closeup,
};

// 🧠 Helper: extract user identifier from token or storage
const getCurrentUserKey = () => {
  try {
    const token = getToken();
    if (!token) return "guest_cart";

    // Example: decode token payload if JWT
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id || payload.email || "user";
    return `cartItems_${userId}`;
  } catch {
    return "guest_cart";
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [storageKey, setStorageKey] = useState("guest_cart");

  // 🟢 Load user-specific cart on login or token change
  useEffect(() => {
    const key = getCurrentUserKey();
    setStorageKey(key);

    try {
      const stored = localStorage.getItem(key);
      setCartItems(stored ? JSON.parse(stored) : []);
    } catch {
      setCartItems([]);
    }
  }, []);

  // 🟢 Save cart to user-specific storage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, storageKey]);

  const addToCart = (item) => {
    const key = item.name?.toLowerCase().replace(/\s+/g, "");
    const image = fallbackImages[key] || milk;
    const updatedItem = { ...item, image, quantity: 1 };

    setCartItems((prev) => {
      const exists = prev.find((p) => p._id === item._id);
      const newCart = exists
        ? prev.map((p) =>
            p._id === item._id ? { ...p, quantity: p.quantity + 1 } : p
          )
        : [...prev, updatedItem];

      alert(`${item.name} added to cart 🛒`);
      return newCart;
    });
  };

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((item) => item._id !== id));

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) return removeFromCart(id);
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const getTotalPrice = () =>
    cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );

  const getTotalItems = () =>
    cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(storageKey);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getTotalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


