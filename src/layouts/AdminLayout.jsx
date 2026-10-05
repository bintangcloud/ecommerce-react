// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function AdminLayout() {
  // State untuk membuka/tutup sidebar di layar HP (Mobile)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar khusus HP */}
        <div className="md:hidden bg-white shadow p-4 flex justify-between items-center">
          <h1 className="font-bold text-[#8B0000]">Kopdes Admin</h1>
          <button
            className="p-2 border rounded bg-gray-200 text-sm font-bold"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            MENU
          </button>
        </div>
        
        {/* Area Konten Dinamis */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        
        {/* Footer Admin */}
        <footer className="bg-white border-t p-4 text-center text-sm text-gray-500">
          © 2026 Admin Kopdes | v1.0.0
        </footer>
      </div>
    </div>
  );
}