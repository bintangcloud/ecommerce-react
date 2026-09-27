import { Link } from "react-router-dom";
import ramenImg from "../assets/ramen.png";

{/* Export Komponen dengan nama Navbar */}
export default function Navbar() {
  return (
    <nav className="bg-[#8B0000] text-[#E6C36A] px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="logo-font text-[#E6C36A] font-bold text-xl flex items-center gap-2">
      <img 
          src={ramenImg} 
          alt="SabiRamen Logo"
          className="w-8 h-8 object-cover rounded-full"
        />
        SabiRamen
      </Link>
      
      {/* Menu Navigasi */}
      <div className="flex gap-6">
        <Link to="/dashboard" className="hover:text-[#F5E6C8]">
          Menu
        </Link>
        <Link to="/cart" className="hover:text-[#F5E6C8]">
          Keranjang
        </Link>
        <Link to="/checkout" className="hover:text-[#F5E6C8]">
          Checkout
        </Link>
      </div>
    </nav>
  );
}