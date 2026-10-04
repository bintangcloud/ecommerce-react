// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
// 1. Panggil useCart dari file Context kita
import { useCart } from "../utils/CartContext";

export default function ProductCard({ p }) {
  // 2. Ekstrak fungsi addToCart
  const { addToCart } = useCart();

  return (
    <div className="bg-[#8B0000] border rounded-lg p-4 shadow hover:shadow-lg flex flex-col justify-between">
      <div>
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-48 object-cover rounded-md mb-3 bg-white"
        />
        <h2 className="text-[#FFFFFF] text-lg font-bold">{p.name}</h2>
        <p className="text-gray-200 text-sm mt-1 mb-2">Stok: {p.stock} | Kategori: {p.category_name}</p>
      </div>
      
      <div>
        <p className="text-[#FFE600] font-bold text-lg mb-4">
          Rp {p.price.toLocaleString("id-ID")}
        </p>
        
        <div className="flex flex-col gap-2">
          <Link
            to={`/product/${p.slug}`}
            state={p} 
            className="bg-white text-[#8B0000] text-center font-semibold py-2 rounded block hover:bg-gray-100 transition"
          >
            Lihat Detail
          </Link>
          
          {/* 3. Tombol untuk menambah barang ke keranjang */}
          <button
            onClick={() => addToCart(p)}
            className="bg-[#FFE600] text-[#8B0000] font-bold py-2 rounded block hover:bg-yellow-400 transition"
          >
            + Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}