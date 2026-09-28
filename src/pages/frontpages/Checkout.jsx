import { useState } from "react";
import { Link } from "react-router-dom";

export default function Checkout() {
  // State untuk melacak apakah user sudah selesai checkout atau belum
  const [isSuccess, setIsSuccess] = useState(false);

  // Fungsi yang dijalankan saat form disubmit
  const handleCheckout = (e) => {
    e.preventDefault(); // Mencegah halaman me-refresh (khas React)
    setIsSuccess(true); // Mengubah status menjadi sukses
  };

  // Jika sukses, tampilkan pesan terima kasih (bukan form lagi)
  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center bg-white p-10 rounded-lg shadow-md border mt-10">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">Pesanan Berhasil Dibuat!</h2>
        <p className="text-gray-600 mb-8">
          Terima kasih telah berbelanja sembako di Kopdes. Pesanan Anda akan segera kami kemas dan antar ke alamat tujuan.
        </p>
        <Link 
          to="/" 
          className="bg-[#8B0000] text-white py-3 px-8 rounded-lg font-bold hover:bg-red-800 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  // Jika belum checkout, tampilkan form pengiriman
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Checkout Pesanan</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* BAGIAN KIRI: Form Inputan Pengguna */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow border">
          <h2 className="font-bold text-xl mb-4 border-b pb-2">Informasi Pengiriman</h2>
          
          <form onSubmit={handleCheckout} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Penerima</label>
              <input 
                type="text" 
                required 
                placeholder="Contoh: Bintang" 
                className="w-full border p-2 rounded focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Telepon / WA</label>
              <input 
                type="tel" 
                required 
                placeholder="Contoh: 081234567890" 
                className="w-full border p-2 rounded focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Alamat Lengkap</label>
              <textarea 
                required 
                rows="3" 
                placeholder="Contoh: Jl. Raya Marga, Tabanan..." 
                className="w-full border p-2 rounded focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
              ></textarea>
            </div>

            <h2 className="font-bold text-xl mt-6 mb-2 border-b pb-2">Metode Pembayaran</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-2">
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-3 rounded border hover:bg-gray-100 flex-1">
                <input type="radio" name="payment" value="cod" required className="accent-[#8B0000] w-4 h-4" />
                Bayar di Tempat (COD)
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-3 rounded border hover:bg-gray-100 flex-1">
                <input type="radio" name="payment" value="transfer" required className="accent-[#8B0000] w-4 h-4" />
                Transfer Bank
              </label>
            </div>

            <button 
              type="submit" 
              className="mt-4 bg-[#8B0000] text-white py-3 rounded-lg font-bold hover:bg-red-800 transition shadow"
            >
              Buat Pesanan Sekarang
            </button>
          </form>
        </div>

        {/* BAGIAN KANAN: Ringkasan Pesanan (Dummy Data dari Keranjang tadi) */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow border h-fit">
          <h2 className="font-bold text-xl border-b pb-3 mb-4">Ringkasan Pesanan</h2>
          
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Beras Premium 5kg (1x)</span>
            <span className="font-medium">Rp 75.000</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-600">Minyak Goreng 2L (2x)</span>
            <span className="font-medium">Rp 68.000</span>
          </div>
          
          <div className="flex justify-between border-t pt-4 mb-2">
            <span className="text-gray-600">Subtotal Produk</span>
            <span className="font-medium">Rp 143.000</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Ongkos Kirim</span>
            <span className="font-medium">Rp 10.000</span>
          </div>
          
          <div className="flex justify-between border-t border-b py-4 mb-6">
            <span className="font-bold text-lg">Total Bayar</span>
            <span className="font-bold text-xl text-[#8B0000]">Rp 153.000</span>
          </div>
          
          <p className="text-xs text-gray-400 text-center">
            Informasi pesanan Anda dilindungi dan dienkripsi.
          </p>
        </div>

      </div>
    </div>
  );
}