import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function MainLayout() {
  // 1. Buat state untuk Search dan Filter
  const [kataKunci, setKataKunci] = useState("");
  const [kategori, setKategori] = useState("Semua Kategori");

  return (
    <div className="bg-[#FFFFFF] flex flex-col min-h-screen">
      <Navbar />
      
      {/* 2. Sambungkan input dan select dengan state */}
      <header className="bg-gray-50 border-b p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Cari produk..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          className="text-[#8B0000] w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:border-[#8B0000]"
        />
        
        <select 
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="text-[#8B0000] px-4 py-2 border rounded-lg focus:outline-none focus:border-[#8B0000]"
        >
          <option>Semua Kategori</option>
          <option>Sembako</option>
          <option>Bahan Dapur</option>
        </select>
      </header>
      
      <main className="flex-1 p-6">
        {/* 3. Kirim datanya ke halaman Anak (Dashboard) lewat context */}
        <Outlet context={{ kataKunci, kategori }} />
      </main>
      
      <footer className="bg-[#8B0000] text-[#FFFFFF] text-center p-4">
        <p>© 2026 My-Kopdes Simple App | Version 1.0</p>
      </footer>
    </div>
  );
}