import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import { reduceStockAfterCheckout } from "../../utils/data";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";

export default function Checkout() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { cart, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const directItem = location.state?.directBuyItem;
  const itemsToCheckout = directItem ? [directItem] : cart;
  const subtotal = itemsToCheckout.reduce(
    (total, item) =>
      total + item.price * (item.qty || item.quantity || 1),
    0
  );

  const ongkir = 10000;
  const totalBayar =
    itemsToCheckout.length > 0 ? subtotal + ongkir : 0;

//checkout handler
  const handleCheckout = (e) => {
    e.preventDefault();

    if (itemsToCheckout.length === 0) {
      return;
    }

    // Kurangi stok produk
    reduceStockAfterCheckout(itemsToCheckout);

    //menghitung riwayat produk yang terjual
    const riwayatTerjual =
    JSON.parse(localStorage.getItem("kopdes_product_sold")) || {};

    itemsToCheckout.forEach((item) => {
      const qty = item.qty || item.quantity || 1;

      riwayatTerjual[item.id] =
        (riwayatTerjual[item.id] || 0) + qty;
    });

    localStorage.setItem(
      "kopdes_product_sold",
      JSON.stringify(riwayatTerjual)
    );

// Simpan riwayat belanja ke localStorage
    const riwayatLama =
      JSON.parse(
        localStorage.getItem("kopdes_riwayat_belanja")
      ) || [];

    const idBarangDibeli = itemsToCheckout.map(
      (item) => item.id
    );

    const riwayatBaru = [
      ...new Set([
        ...riwayatLama,
        ...idBarangDibeli
      ])
    ];

    localStorage.setItem(
      "kopdes_riwayat_belanja",
      JSON.stringify(riwayatBaru)
    );

    // Jika checkout dari halaman produk langsung, jangan hapus keranjang
    if (!directItem) {
      clearCart();
    }

    setIsSuccess(true);
  };

  // Jika checkout berhasil, tampilkan pesan sukses
  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center bg-white p-10 rounded-lg shadow-md border mt-10">
        <div className="text-6xl mb-4">
          🎉
        </div>

        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Pesanan Berhasil Dibuat!
        </h2>

        <p className="text-gray-600 mb-8">
          Terima kasih telah berbelanja di Kopdes.
          Pesanan Anda akan segera kami antar.
        </p>

      <Button onClick={() => navigate("/")} className="px-8 mx-auto">
        Kembali ke Dashboard
      </Button>
      </div>
    );
  }

  // Render halaman checkout
  return (
    <div className="max-w-5xl mx-auto p-6">

    <BackButton to="/" />

      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">
        Checkout Pesanan
      </h1>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Form Pengiriman */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow border">
          <h2 className="font-bold text-xl mb-4 border-b pb-2">
            Informasi Pengiriman
          </h2>

          <form
            onSubmit={handleCheckout}
            className="flex flex-col gap-4"
          >

            {/* Nama */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nama Penerima
              </label>

              <input
                type="text"
                required
                placeholder="Contoh: Bintang"
                className="w-full border p-2 rounded focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
              />
            </div>

            {/* Nomor Telepon */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nomor Telepon / WA
              </label>

              <input
                type="tel"
                required
                placeholder="Contoh: 081234567890"
                className="w-full border p-2 rounded focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
              />
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Alamat Lengkap
              </label>

              <textarea
                required
                rows="3"
                placeholder="Contoh: Jl. Raya Marga, Tabanan..."
                className="w-full border p-2 rounded focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
              ></textarea>
            </div>

            {/* Metode Pembayaran */}

            <h2 className="font-bold text-xl mt-6 mb-2 border-b pb-2">
              Metode Pembayaran
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-2">

              {/* COD */}
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-3 rounded border hover:bg-gray-100 flex-1">

                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  required
                  className="accent-[#8B0000] w-4 h-4"
                />

                Bayar di Tempat (COD)

              </label>

              {/* Transfer */}
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-3 rounded border hover:bg-gray-100 flex-1">

                <input
                  type="radio"
                  name="payment"
                  value="transfer"
                  required
                  className="accent-[#8B0000] w-4 h-4"
                />

                Transfer Bank

              </label>

            </div>

            {/* Tombol Checkout */}
            <Button 
              type="submit" 
              disabled={itemsToCheckout.length === 0} 
              className="mt-4 w-full"
            >
              Buat Pesanan Sekarang
            </Button>

          </form>
        </div>

        {/* Ringkasan Pesanan*/}

        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow border h-fit">
          <h2 className="font-bold text-xl border-b pb-3 mb-4">
            Ringkasan Pesanan
          </h2>

          {itemsToCheckout.length === 0 ? (

            <p className="text-gray-500 text-sm mb-4">
              Belum ada produk untuk di-checkout.
            </p>

          ) : (

            <div className="mb-4 max-h-48 overflow-y-auto pr-2">

              {itemsToCheckout.map((item) => {

                const quantity =
                  item.qty || item.quantity || 1;

                return (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm mb-3 border-b border-gray-100 pb-2 last:border-0"
                  >

                    <span className="text-gray-600 line-clamp-1 flex-1 pr-2">
                      {item.name} ({quantity}x)
                    </span>

                    <span className="font-medium whitespace-nowrap">
                      Rp{" "}
                      {(
                        item.price * quantity
                      ).toLocaleString("id-ID")}
                    </span>

                  </div>
                );
              })}

            </div>
          )}

          {/* Subtotal */}
          <div className="flex justify-between border-t pt-4 mb-2 text-sm">

            <span className="text-gray-600">
              Subtotal Produk
            </span>

            <span className="font-medium">
              Rp {subtotal.toLocaleString("id-ID")}
            </span>

          </div>

          {/* Ongkir */}
          <div className="flex justify-between mb-4 text-sm">

            <span className="text-gray-600">
              Ongkos Kirim
            </span>

            <span className="font-medium">
              Rp{" "}
              {itemsToCheckout.length > 0
                ? ongkir.toLocaleString("id-ID")
                : "0"}
            </span>

          </div>

          {/* Total */}
          <div className="flex justify-between border-t border-b py-4 mb-6">

            <span className="font-bold text-lg">
              Total Bayar
            </span>

            <span className="font-bold text-xl text-[#8B0000]">
              Rp {totalBayar.toLocaleString("id-ID")}
            </span>

          </div>

        </div>
      </div>
    </div>
  );
}