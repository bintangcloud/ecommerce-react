// src/utils/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Fungsi Tambah ke cart
  const addToCart = (product) => {
    setCart((prev) => {
      // Cek apakah barang sudah ada di keranjang
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Fungsi Update jumlah barang (qty)
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  // Fungsi Hapus barang
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Menghitung total barang untuk ditampilkan di Navbar
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, totalQty }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook agar gampang dipanggil di file lain
export const useCart = () => useContext(CartContext);