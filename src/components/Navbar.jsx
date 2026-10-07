import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function Navbar({ 
  kataKunci, 
  setKataKunci, 
  kategori, 
  setKategori, 
  daftarKategori, 
  isDashboard 
}) {
  const { totalQty } = useCart();

  return (
    // Sticky Navbar dengan efek blur dan transparansi
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="bg-[#8B0000] text-white font-black text-xl w-10 h-10 flex items-center justify-center rounded-xl shadow-md group-hover:rotate-12 transition-transform">
            K
          </div>
          <span className="font-extrabold text-xl text-gray-800 tracking-tight hidden sm:block">
            My<span className="text-[#8B0000]">KopDes</span>
          </span>
        </Link>

        {/* Search and Filter */}
        {isDashboard && (
          <div className="order-last md:order-none w-full md:w-auto flex-1 flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto">
            
            {/* Search Bar */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari produk..."
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:bg-white transition-all"
              />
            </div>

            {/* Filter Kategori */}
            <select 
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full sm:w-auto bg-gray-50 border border-gray-200 text-gray-700 py-2 px-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000] cursor-pointer font-medium hover:bg-white transition-all appearance-none"
            >
              {daftarKategori?.map((kat, idx) => (
                <option key={idx} value={kat}>{kat}</option>
              ))}
            </select>
          </div>
        )}

        {/* Keranjang */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/cart" className="relative p-2 text-gray-700 hover:text-[#8B0000] transition hover:bg-red-50 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            
            {/* Badge Angka Keranjang */}
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FFE600] text-[#8B0000] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {totalQty}
              </span>
            )}
          </Link>
        </div>
        
      </div>
    </nav>
  );
}