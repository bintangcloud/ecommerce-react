import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../utils/CartContext";
import Button from "./Button";
import WarningAlert from "./WarningAlert";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();
  const [showNotif, setShowNotif] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalSold, setTotalSold] = useState(0);

  useEffect(() => {
    // 1. Ambil data review dari localStorage
    const savedReviews = JSON.parse(localStorage.getItem(`kopdes_reviews_${p.id}`)) || [];
    if (savedReviews.length > 0) {
      const sum = savedReviews.reduce((acc, curr) => acc + curr.rating, 0);
      setAvgRating((sum / savedReviews.length).toFixed(1));
      setTotalReviews(savedReviews.length);
    }

    // 2. Ambil data jumlah terjual
    const soldData = JSON.parse(localStorage.getItem("kopdes_product_sold")) || {};
    setTotalSold(soldData[p.id] || 0);
  }, [p.id]);

  const handleAddToCart = () => {
    const success = addToCart(p, 1);
    
    if (success) {
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 1000);
    } else {
      setWarningMsg("Stok produk ini sudah maksimal di keranjang belanjaanmu!");
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 1000);
    }
  };

  return (
    // Kartu Produk dengan efek hover dan shadow
    <div className="relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
      
      {/* Notifikasi Berhasil Tambah ke Keranjang */}
      {showNotif && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm transition-all duration-300">
          <div className="bg-[#424242]/95 text-white w-[85%] py-6 px-4 flex flex-col items-center justify-center gap-3 shadow-2xl rounded-2xl animate-fade-in-up">
            <div className="bg-[#00c49a] rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth="4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="text-sm font-bold text-center leading-tight">
              Masuk Keranjang!
            </p>
          </div>
        </div>
      )}

      <WarningAlert message={warningMsg} show={showWarning} />

      {/* Konten Kartu Produk */}
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
        
        {/* Rating & Terjual */}
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
          <Button 
            variant="outline" 
            onClick={() => navigate(`/product/${p.slug}`, { state: p })}
          >
            Detail
          </Button>
          
          <Button 
            variant="primary" 
            onClick={handleAddToCart}
            disabled={p.stock === 0}
          >
            {p.stock === 0 ? "Habis" : "+ Keranjang"}
          </Button>
        </div>
      </div>
    </div>
  );
}