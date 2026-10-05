import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Inisialisasi state dengan membaca Local Storage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("kopdes_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Simpan otomatis ke Local Storage setiap kali cart berubah
  useEffect(() => {
    localStorage.setItem("kopdes_cart", JSON.stringify(cart));
  }, [cart]);

  // Fungsi Tambah ke cart
 const addToCart = (product, qtyToAdd = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qtyToAdd } : item
        );
      }
      return [...prev, { ...product, qty: qtyToAdd }];
    });
  };

  // Fungsi Update jumlah barang (qty)
const updateQty = (id, qty) => {
  setCart((prev) =>
    prev.map((item) => {
      if (item.id === id) {
        // Jangan biarkan qty melebihi stok yang tersedia
        const maxStock = item.stock !== undefined ? item.stock : qty;
        const safeQty = Math.min(qty, maxStock);
        return { ...item, qty: Math.max(1, safeQty) };
      }
      return item;
    })
  );
};

  // Fungsi Hapus barang
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // FUNGSI BARU: Mengosongkan keranjang setelah checkout sukses
  const clearCart = () => {
    setCart([]);
  };

  // Menghitung total barang untuk ditampilkan di Navbar
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider 
      value={{ cart, addToCart, updateQty, removeFromCart, clearCart, totalQty }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);