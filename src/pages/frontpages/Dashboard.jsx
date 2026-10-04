import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/ProductCard";
import { products } from "../../utils/data";

// Buat fungsi simulasi seolah-olah ngambil data dari API server (butuh 1 detik)
const fetchProductsAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1000); 
  });
};

export default function Dashboard() {
  const { kataKunci, kategori } = useOutletContext();

  //React Query untuk mengambil data
  const { data: produkServer, isLoading, isError } = useQuery({
    queryKey: ["dataSembako"],
    queryFn: fetchProductsAPI,
  });

  // Conditional Rendering untuk tampilkan loading atau error
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

  // 5. Filter data yang sudah berhasil diambil (produkServer)
  const produkTampil = produkServer.filter((product) => {
    const cocokNama = product.name.toLowerCase().includes(kataKunci.toLowerCase());
    const cocokKategori = kategori === "Semua Kategori" || product.category_name === kategori;
    return cocokNama && cocokKategori;
  });

  return (
    <div>
      <h1 className="text-[#8B0000] text-2xl font-bold mb-6">Dashboard Kopdes</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
        {produkTampil.map((item) => (
          <ProductCard key={item.id} p={item} />
        ))}
      </div>

      {produkTampil.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-gray-500 font-semibold text-lg">Maaf, barang tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
}