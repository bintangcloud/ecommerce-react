import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../utils/data"; // <--- Diubah mengambil dari getProducts() agar sinkron dengan Admin

const fetchProductsAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getProducts()); // <--- Memuat data lokal terbaru (termasuk inputan admin)
    }, 1000); 
  });
};

export default function Dashboard() {
  const { kataKunci, kategori } = useOutletContext();

  const { data: produkServer, isLoading, isError } = useQuery({
    queryKey: ["dataSembako"],
    queryFn: fetchProductsAPI,
    staleTime: 0, //Jangan simpan cache lama, selalu ambil data terbaru
    refetchOnMount: true, // <--- Ambil ulang data setiap halaman dibuka
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <h2 className="text-2xl font-bold text-[#8B0000] animate-pulse"> Memuat Produk...</h2>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center mt-20 text-red-600 font-bold">Gagal mengambil data produk!</div>;
  }

  const produkTampil = produkServer.filter((product) => {
    const cocokNama = product.name.toLowerCase().includes(kataKunci.toLowerCase());
    const cocokKategori = kategori === "Semua Kategori" || product.category_name === kategori;
    return cocokNama && cocokKategori;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* 1. BANNER PROMO (Sesuai dengan keinginanmu) */}
      <div className="bg-gradient-to-r from-[#8B0000] to-red-800 text-white p-8 rounded-2xl mb-8 shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="bg-[#FFE600] text-[#8B0000] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Koperasi Desa Terpercaya
          </span>
          <h1 className="text-3xl font-bold mt-2">Belanja Kebutuhan Pokok Lebih Mudah dengan My Kopdes</h1>
          <p className="text-gray-100 text-sm mt-1 max-w-xl">
            Penuhi stok sembako harian keluarga dengan kualitas terbaik, harga transparan, dan langsung diantar ke rumah.
          </p>
        </div>
        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 text-center">
          <p className="text-xs text-gray-200">Jam Buka</p>
          <p className="text-lg font-bold text-[#FFE600]">08:00 - 20:00 WITA</p>
        </div>
      </div>

      <h2 className="text-[#8B0000] text-2xl font-bold mb-6">Katalog Produk</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produkTampil.map((item) => (
          <div key={item.id} className="transition-transform duration-300 hover:-translate-y-1">
            <ProductCard p={item} />
          </div>
        ))}
      </div>

      {produkTampil.length === 0 && (
        <div className="text-center mt-12 bg-white p-8 rounded-lg border shadow-sm">
          <p className="text-gray-500 font-semibold text-lg">Maaf, barang yang kamu cari tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
}