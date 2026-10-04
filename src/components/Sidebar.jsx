// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`${sidebarOpen ? "block" : "hidden"} md:block w-64 bg-gray-800 text-white shadow-md`}>
      <div className="p-4 font-bold text-xl border-b border-gray-700">Kopdes Admin</div>
      <nav className="flex flex-col p-4 space-y-2">
        <Link to="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded transition">
          Dashboard
        </Link>
        <Link to="/admin/about" className="hover:bg-gray-700 p-2 rounded transition">
          Tentang Aplikasi
        </Link>
        
        {/* Tombol kembali ke toko depan */}
        <Link to="/" className="hover:bg-red-700 p-2 rounded mt-8 text-sm text-gray-300 border border-gray-600 transition">
          &larr; Kembali ke Toko
        </Link>
      </nav>
    </div>
  );
}