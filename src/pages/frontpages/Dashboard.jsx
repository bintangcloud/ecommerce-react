import { useOutletContext } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { products } from "../../utils/data";

export default function Dashboard() {
  // 1. Tangkap kata kunci dan kategori dari MainLayout
  const { kataKunci, kategori } = useOutletContext();

  // 2. Lakukan penyaringan ganda (berdasarkan nama DAN kategori)
  const produkTampil = products.filter((product) => {
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

      {/* Jika dicari tidak ketemu */}
      {produkTampil.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-gray-500 font-semibold text-lg">
            Maaf, barang tidak ditemukan.
          </p>
        </div>
      )}
    </div>
  );
}