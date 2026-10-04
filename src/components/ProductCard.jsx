import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();
  const [showNotif, setShowNotif] = useState(false);
  
  // State untuk rating dan jumlah terjual
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalSold, setTotalSold] = useState(0);

  useEffect(() => {
    // 1. Ambil data ulasan untuk hitung rata-rata rating
    const savedReviews = JSON.parse(localStorage.getItem(`kopdes_reviews_${p.id}`)) || [];
    if (savedReviews.length > 0) {
      const sum = savedReviews.reduce((acc, curr) => acc + curr.rating, 0);
      setAvgRating((sum / savedReviews.length).toFixed(1)); // contoh: 4.5
      setTotalReviews(savedReviews.length);
    }

    // 2. Ambil data jumlah terjual
    const soldData = JSON.parse(localStorage.getItem("kopdes_product_sold")) || {};
    setTotalSold(soldData[p.id] || 0);
  }, [p.id]);

  const handleAddToCart = () => {
    addToCart(p);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 2000);
  };

  return (
    <>
      {showNotif && (
        <div className="relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
          {/* ... (kode notifmu yang sudah ada) ... */}
        </div>
      )}

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
          
          {/* RATING & TERJUAL DI DASHBOARD */}
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2 mb-2">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 font-bold">★</span>
              <span className="font-semibold text-gray-700">{avgRating > 0 ? avgRating : "Belum ada"}</span>
              {totalReviews > 0 && <span className="text-gray-400">({totalReviews})</span>}
            </div>
            <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium">
              Terjual {totalSold}
            </span>
          </div>

        </div>
        
        <div className="mt-2 pt-3 border-t border-gray-50">
          <p className="text-[#8B0000] font-extrabold text-xl mb-3">
            Rp {p.price.toLocaleString("id-ID")}
          </p>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/product/${p.slug}`}
              state={p} 
              className="border border-gray-200 text-gray-700 text-center text-sm font-bold py-2.5 rounded-xl hover:border-[#8B0000] hover:text-[#8B0000] transition"
            >
              Detail
            </Link>
            
            <button
              onClick={handleAddToCart}
              className="bg-[#8B0000] text-white hover:bg-red-800 text-sm font-bold py-2.5 rounded-xl transition-transform active:scale-95 flex items-center justify-center shadow-sm"
            >
              + Keranjang
            </button>
          </div>
        </div>
      </div>
    </>
  );
}