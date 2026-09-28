import { Link } from "react-router-dom";
import koperasiImg from "../assets/koperasi.png";

{/* Export Komponen dengan nama Navbar */}
export default function Navbar() {
  return (
    <nav className="bg-[#8B0000] text-[#FFFFFF] px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="logo-font text-[#FFFFFF] font-bold text-xl flex items-center gap-2">
      <img 
          src={koperasiImg} 
          alt="SabiRamen Logo"
          className="w-8 h-8 object-cover rounded-full"
        />
        My KopDes Shop
      </Link>
      
      {/* Menu Navigasi */}
      <div className="flex gap-6">
        <Link to="/dashboard" className="hover:text-[#ffffffc7]">
          Dashboard
        </Link>
        <Link to="/cart" className="hover:text-[#ffffffc7]">
          Keranjang
        </Link>
        <Link to="/checkout" className="hover:text-[#ffffffc7]">
          Checkout
        </Link>
      </div>
    </nav>
  );
}