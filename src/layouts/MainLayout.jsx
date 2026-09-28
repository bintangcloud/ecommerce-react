import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function MainLayout() {
  return (
    <div className="bg-[#FFFFFF] flex flex-col min-h-screen">
      {/* Header/Navbar */}
      <Navbar />
      
      {/* Search & Filter */}
      <header className="bg-[#FFFFFF] p-4 flex flex-col md:flex-row gap-2 justify-between items-center">
        <input
          type="text"
          placeholder="Cari produk..."
          className="text-[#8B0000] w-full md:w-1/3 px-4 py-2 border rounded-lg"
        />
        <select className="text-[#8B0000] px-4 py-2 border rounded-lg">
          <option>Semua Kategori</option>
          <option>Sembako</option>
          <option>Rumah Tangga</option>
          <option>Elektronik</option>
        </select>
      </header>
      
      {/* Main Section */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-[#8B0000] text-[#FFFFFF]  text-center p-4">
        <p>© 2026 My-Kopdes Simple App | Version 1.0</p>
      </footer>
    </div>
  );
}