// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div>
        {/* Gambar Produk */}
        <div className="relative overflow-hidden rounded-lg mb-3 bg-gray-100 h-48">
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
          <span className="absolute top-2 left-2 bg-[#8B0000] text-white text-xs px-2.5 py-1 rounded-full font-medium shadow">
            {p.category_name}
          </span>
        </div>

        {/* Nama dan Stok */}
        <h2 className="text-gray-800 text-lg font-bold line-clamp-1">{p.name}</h2>
        <p className="text-gray-500 text-xs mt-1">Stok tersedia: {p.stock} pcs</p>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#8B0000] font-extrabold text-lg">
            Rp {p.price.toLocaleString("id-ID")}
          </p>
        </div>

        {/* Tombol Aksi yang Lebih Estetik */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/product/${p.slug}`}
            state={p} 
            className="border border-[#8B0000] text-[#8B0000] text-center text-sm font-semibold py-2 rounded-lg hover:bg-red-50 transition"
          >
            Detail
          </Link>
          
          <button
            onClick={() => addToCart(p)}
            className="bg-[#8B0000] text-white text-sm font-semibold py-2 rounded-lg hover:bg-red-800 transition shadow-sm flex items-center justify-center gap-1"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}