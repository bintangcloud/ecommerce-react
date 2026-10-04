import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import { reduceStockAfterCheckout } from "../../utils/data";

export default function Checkout() {
  const [isSuccess, setIsSuccess] = useState(false);

  const { cart, clearCart } = useCart();

  // 3. Hitung subtotal dan total bayar dinamis
  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const ongkir = 10000;
  // Jika keranjang kosong, total bayar 0. Jika ada isinya, tambah ongkir.
  const totalBayar = subtotal > 0 ? subtotal + ongkir : 0;

  const handleCheckout = (e) => {
    e.preventDefault(); 
    reduceStockAfterCheckout(cart);
    setIsSuccess(true);
    clearCart(); 
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center bg-white p-10 rounded-lg shadow-md border mt-10">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">Pesanan Berhasil Dibuat!</h2>
        <p className="text-gray-600 mb-8">
          Terima kasih telah berbelanja di Kopdes. Pesanan Anda akan segera kami antar.
        </p>
        <Link 
          to="/" 
          className="bg-[#8B0000] text-white py-3 px-8 rounded-lg font-bold hover:bg-red-800 transition"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Checkout Pesanan</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* BAGIAN KIRI: Form Pengiriman */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow border">
          <h2 className="font-bold text-xl mb-4 border-b pb-2">Informasi Pengiriman</h2>
          
          <form onSubmit={handleCheckout} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Penerima</label>
              <input type="text" required placeholder="Contoh: Bintang" className="w-full border p-2 rounded focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Telepon / WA</label>
              <input type="tel" required placeholder="Contoh: 081234567890" className="w-full border p-2 rounded focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Alamat Lengkap</label>
              <textarea required rows="3" placeholder="Contoh: Jl. Raya Marga, Tabanan..." className="w-full border p-2 rounded focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"></textarea>
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
              disabled={cart.length === 0}
              className={`mt-4 py-3 rounded-lg font-bold shadow transition ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8B0000] text-white hover:bg-red-800'}`}
            >
              Buat Pesanan Sekarang
            </button>
          </form>
        </div>

        {/* BAGIAN KANAN: Ringkasan Pesanan Dinamis */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow border h-fit">
          <h2 className="font-bold text-xl border-b pb-3 mb-4">Ringkasan Pesanan</h2>
          
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm mb-4">Belum ada produk untuk di-checkout.</p>
          ) : (
            <div className="mb-4 max-h-48 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-3 border-b border-gray-100 pb-2 last:border-0">
                  <span className="text-gray-600 line-clamp-1 flex-1 pr-2">{item.name} ({item.qty}x)</span>
                  <span className="font-medium whitespace-nowrap">Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-between border-t pt-4 mb-2 text-sm">
            <span className="text-gray-600">Subtotal Produk</span>
            <span className="font-medium">Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between mb-4 text-sm">
            <span className="text-gray-600">Ongkos Kirim</span>
            <span className="font-medium">Rp {cart.length > 0 ? ongkir.toLocaleString("id-ID") : 0}</span>
          </div>
          
          <div className="flex justify-between border-t border-b py-4 mb-6">
            <span className="font-bold text-lg">Total Bayar</span>
            <span className="font-bold text-xl text-[#8B0000]">Rp {totalBayar.toLocaleString("id-ID")}</span>
          </div>
        </div>

      </div>
    </div>
  );
}