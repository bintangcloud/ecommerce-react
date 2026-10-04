import { Link } from "react-router-dom";
// 1. Import useCart dari CartContext sesuai Modul 2
import { useCart } from "../utils/CartContext";
import koperasiImg from "../assets/koperasi.png";

{/* Export Komponen dengan nama Navbar */}
export default function Navbar() {
  // 2. Mengambil variabel totalQty dari context UseCart
  const { totalQty } = useCart();

  return (
    <nav className="bg-[#8B0000] text-[#FFFFFF] px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="logo-font text-[#FFFFFF] font-bold text-xl flex items-center gap-2">
        <img 
          src={koperasiImg} 
          alt="Kopdes Logo"
          className="w-8 h-8 object-cover rounded-full border-2 border-white"
        />
        My KopDes Shop
      </Link>
      
      {/* Menu Navigasi */}
      <div className="flex gap-6 font-medium">
        <Link to="/dashboard" className="hover:text-[#ffffffc7] flex items-center">
          Dashboard
        </Link>
        
        {/* 3. Menampilkan totalQty jika ada item di keranjang */}
        <Link to="/cart" className="hover:text-[#ffffffc7] flex items-center gap-1.5">
          Keranjang
          {totalQty > 0 && (
            <span className="bg-[#FFE600] text-[#8B0000] text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">
              {totalQty}
            </span>
          )}
        </Link>
        
        <Link to="/checkout" className="hover:text-[#ffffffc7] flex items-center">
          Checkout
        </Link>
      </div>
    </nav>
  );
}