// src/components/ProductCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(p);
    setAdded(true);
    // Kembalikan tombol ke semula setelah 2 detik
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
      <div>
        <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-50 h-48">
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[#8B0000] text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">
            {p.category_name}
          </span>
        </div>

        <h2 className="text-gray-800 text-lg font-bold line-clamp-1">{p.name}</h2>
        <p className="text-gray-500 text-xs mt-1 font-medium">Stok: {p.stock} pcs</p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-50">
        <p className="text-[#8B0000] font-extrabold text-xl mb-3">
          Rp {p.price.toLocaleString("id-ID")}
        </p>

        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/product/${p.slug}`}
            state={p} 
            className="border-2 border-gray-100 text-gray-700 text-center text-sm font-bold py-2 rounded-xl hover:border-[#8B0000] hover:text-[#8B0000] transition"
          >
            Detail
          </Link>
          
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`text-sm font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-1 shadow-sm ${
              added 
                ? "bg-green-500 text-white scale-95" 
                : "bg-[#8B0000] text-white hover:bg-red-800 hover:-translate-y-0.5"
            }`}
          >
            {added ? "Berhasil" : "+ Keranjang"}
          </button>
        </div>
      </div>
    </div>
  );
}