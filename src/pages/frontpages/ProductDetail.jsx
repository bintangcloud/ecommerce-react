import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function ProductDetail() {
  // 1. Menangkap state (data produk) yang dikirim dari ProductCard
  const location = useLocation();
  const p = location.state; 

  // 2. State Lokal untuk mengelola input rating dan review (Langkah 4 Modul)
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  // Jika user refresh halaman atau ketik URL manual (state hilang)
  if (!p) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-600">Produk Tidak Ditemukan</h1>
        <p className="mt-4 text-gray-600">Kembali ke dashboard untuk memilih produk.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 block">Kembali ke Beranda</Link>
      </div>
    );
  }

  // Fungsi menyimpan review ke dalam state sementara
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) return;
    
    const newReview = {
      id: Date.now(),
      rating,
      review,
    };
    
    setReviews([...reviews, newReview]);
    setRating(0); // Reset form
    setReview(""); // Reset form
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 flex flex-col md:flex-row gap-6">
      
      {/* BAGIAN KIRI: Info Produk & Daftar Review */}
      <section className="flex-1 space-y-6">
        <Link to="/" className="text-[#8B0000] hover:underline mb-2 inline-block font-semibold">
          &larr; Kembali
        </Link>
        
        <div className="border rounded-lg p-6 shadow-sm bg-white">
          <img src={p.img} alt={p.name} className="w-full h-64 object-cover rounded-md mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">{p.name}</h1>
          <p className="text-2xl font-bold text-[#8B0000] mt-2">Rp {p.price.toLocaleString("id-ID")}</p>
          <p className="text-gray-500 mt-2">Stok Tersedia: {p.stock}</p>
        </div>

        {/* Daftar Review Pengguna */}
        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Ulasan Pembeli</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500 italic">Belum ada ulasan. Jadilah yang pertama!</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li key={r.id} className="border-b pb-4 last:border-0">
                  <div className="flex gap-1 mb-2">
                    {[...Array(r.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                    {[...Array(5 - r.rating)].map((_, i) => (
                      <span key={i} className="text-gray-300">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700">{r.review}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* BAGIAN KANAN: Form Tambah Review */}
      <section className="md:w-1/3 h-fit border rounded-lg p-6 shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Beri Ulasan</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-medium mb-1">Pilih Rating:</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl ${star <= rating ? "text-yellow-500" : "text-gray-300"} hover:scale-110 transition`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Tulis Pengalamanmu:</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
              rows="4"
              placeholder="Sembakonya bagus dan murah..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#8B0000] text-white font-bold rounded-lg hover:bg-red-800 transition"
          >
            Kirim Ulasan
          </button>
        </form>
      </section>
      
    </div>
  );
}