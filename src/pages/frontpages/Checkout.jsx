import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import { reduceStockAfterCheckout } from "../../utils/data";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";

export default function Checkout() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // State untuk gaya tombol pembayaran
  const { cart, clearCart, removeFromCart } = useCart(); // Tambahkan removeFromCart
  const location = useLocation();
  const navigate = useNavigate();
  
  const directItem = location.state?.directBuyItem;
  const selectedFromCart = location.state?.selectedItemsForCheckout; // Tangkap data yg di-ceklis
  
  // Beli Langsung -> Barang di-Ceklis -> Seluruh Keranjang (fallback)
  const itemsToCheckout = directItem ? [directItem] : (selectedFromCart || cart);
  const subtotal = itemsToCheckout.reduce(
    (total, item) => total + item.price * (item.qty || item.quantity || 1),
    0
  );

  const ongkir = 10000;
  const totalBayar = itemsToCheckout.length > 0 ? subtotal + ongkir : 0;

  // Checkout handler
  const handleCheckout = (e) => {
    e.preventDefault();

    if (itemsToCheckout.length === 0) {
      return;
    }

    // Kurangi stok produk
    reduceStockAfterCheckout(itemsToCheckout);

    // Menghitung riwayat produk yang terjual
    const riwayatTerjual = JSON.parse(localStorage.getItem("kopdes_product_sold")) || {};

    itemsToCheckout.forEach((item) => {
      const qty = item.qty || item.quantity || 1;
      riwayatTerjual[item.id] = (riwayatTerjual[item.id] || 0) + qty;
    });

    localStorage.setItem("kopdes_product_sold", JSON.stringify(riwayatTerjual));

    // Simpan riwayat belanja ke localStorage
    const riwayatLama = JSON.parse(localStorage.getItem("kopdes_riwayat_belanja")) || [];
    const idBarangDibeli = itemsToCheckout.map((item) => item.id);
    const riwayatBaru = [...new Set([...riwayatLama, ...idBarangDibeli])];

    localStorage.setItem("kopdes_riwayat_belanja", JSON.stringify(riwayatBaru));

    // Jika checkout dari halaman produk langsung, jangan hapus keranjang
    // Hapus hanya barang yang berhasil di-checkout dari keranjang
    if (!directItem) {
      if (selectedFromCart) {
        selectedFromCart.forEach(item => removeFromCart(item.id));
      } else {
        clearCart();
      }
    }

    setIsSuccess(true);
  };

  // TAMPILAN SUKSES 
  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 animate-fade-in-down">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Hore! Pesanan Berhasil 🎉
          </h2>
          
          <p className="text-gray-500 mb-8 leading-relaxed">
            Terima kasih telah berbelanja di MyKopDes. Pesanan Anda sudah kami terima dan akan segera diproses untuk pengiriman.
          </p>

          <Button onClick={() => navigate("/")} className="w-full py-3.5 rounded-xl shadow-lg hover:-translate-y-1 transition-all">
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

  // RENDER HALAMAN CHECKOUT UTAMA
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col items-start gap-3 mb-8">
        <BackButton to="/cart" /> {/* Sebaiknya kembali ke keranjang */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight ml-1">
          Checkout <span className="text-[#8B0000]">Pesanan</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Form Pengiriman (Kiri) */}
        <div className="w-full lg:w-2/3 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="bg-red-50 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#8B0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h2 className="font-bold text-xl text-gray-900">Informasi Pengiriman</h2>
          </div>

          <form onSubmit={handleCheckout} className="flex flex-col gap-5">
            {/* Nama */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nama Penerima</label>
              <input
                type="text"
                required
                placeholder="Contoh: Bintang Permatasari"
                className="w-full border border-gray-200 bg-gray-50 p-3.5 rounded-xl focus:bg-white focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] transition-colors"
              />
            </div>

            {/* Nomor Telepon */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nomor Telepon / WhatsApp</label>
              <input
                type="tel"
                required
                placeholder="Contoh: 081234567890"
                className="w-full border border-gray-200 bg-gray-50 p-3.5 rounded-xl focus:bg-white focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] transition-colors"
              />
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Lengkap</label>
              <textarea
                required
                rows="3"
                placeholder="Sertakan nama jalan, RT/RW, desa, kecamatan..."
                className="w-full border border-gray-200 bg-gray-50 p-3.5 rounded-xl focus:bg-white focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] transition-colors resize-none"
              ></textarea>
            </div>

            {/* Metode Pembayaran */}
            <div className="mt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-50 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#8B0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                </div>
                <h2 className="font-bold text-xl text-gray-900">Metode Pembayaran</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Opsi COD */}
                <label 
                  className={`relative flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${paymentMethod === 'cod' ? 'border-[#8B0000] bg-red-50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    required
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only" // Menyembunyikan radio button asli
                  />
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-[#8B0000] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div>
                      <p className={`font-bold ${paymentMethod === 'cod' ? 'text-[#8B0000]' : 'text-gray-700'}`}>Bayar di Tempat</p>
                      <p className="text-xs text-gray-500">Cash on Delivery (COD)</p>
                    </div>
                  </div>
                </label>

                {/* Opsi Transfer Bank */}
                <label 
                  className={`relative flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${paymentMethod === 'transfer' ? 'border-[#8B0000] bg-red-50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    required
                    checked={paymentMethod === "transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only" // Menyembunyikan radio button asli
                  />
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === 'transfer' ? 'bg-[#8B0000] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                    </div>
                    <div>
                      <p className={`font-bold ${paymentMethod === 'transfer' ? 'text-[#8B0000]' : 'text-gray-700'}`}>Transfer Bank</p>
                      <p className="text-xs text-gray-500">Virtual Account</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Tombol Submit Khusus Mobile (Tersembunyi di Desktop) */}
            <Button 
              type="submit" 
              disabled={itemsToCheckout.length === 0} 
              className="mt-6 w-full py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all lg:hidden"
            >
              Buat Pesanan Sekarang
            </Button>
          </form>
        </div>

        {/* Ringkasan Pesanan (Kanan - Sticky) */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="font-bold text-xl text-gray-900 mb-6 border-b border-gray-100 pb-4">
              Ringkasan Pesanan
            </h2>

            {itemsToCheckout.length === 0 ? (
              <p className="text-gray-500 text-sm mb-4 text-center py-4 bg-gray-50 rounded-xl">
                Belum ada produk untuk di-checkout.
              </p>
            ) : (
              <div className="mb-6 max-h-64 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
                {itemsToCheckout.map((item) => {
                  const quantity = item.qty || item.quantity || 1;
                  return (
                    <div key={item.id} className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 line-clamp-2 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{quantity} x Rp {item.price.toLocaleString("id-ID")}</p>
                      </div>
                      <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                        Rp {(item.price * quantity).toLocaleString("id-ID")}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="space-y-3 text-sm border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal Produk</span>
                <span className="font-semibold text-gray-900">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Ongkos Kirim</span>
                <span className="font-semibold text-gray-900">
                  Rp {itemsToCheckout.length > 0 ? ongkir.toLocaleString("id-ID") : "0"}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-gray-100 pt-4 mb-8">
              <span className="font-bold text-gray-900">Total Bayar</span>
              <span className="font-extrabold text-2xl text-[#8B0000] leading-none">
                Rp {totalBayar.toLocaleString("id-ID")}
              </span>
            </div>

            {/* Tombol Submit Khusus Desktop (Menjalankan Form di Kiri) */}
            <Button 
              onClick={(e) => {
                // Memanggil trigger submit pada form
                const form = document.querySelector('form');
                if(form.checkValidity()) {
                  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                } else {
                  form.reportValidity();
                }
              }}
              disabled={itemsToCheckout.length === 0} 
              className="w-full py-4 text-lg rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all hidden lg:block"
            >
              Selesaikan Pesanan
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}