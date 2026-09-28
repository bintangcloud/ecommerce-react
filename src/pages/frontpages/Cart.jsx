import { useState } from "react";
import { Link } from "react-router-dom";

// 1. Import foto untuk keranjang
import berasImg from "../../assets/beras.png";
import minyakImg from "../../assets/minyak.jpg";

export default function Cart() {
  // 2. DATA DUMMY KERANJANG: Anggap saja pembeli sudah memasukkan 2 barang ini
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Beras Premium 5kg",
      price: 75000,
      qty: 1,
      image: berasImg,
    },
    {
      id: 2,
      name: "Minyak Goreng 2L",
      price: 34000,
      qty: 2,
      image: minyakImg,
    },
  ]);

  // 3. FUNGSI MANIPULASI DATA
  // Fungsi menghapus barang dari keranjang
  const handleRemove = (id) => {
    const sisaBarang = cartItems.filter((item) => item.id !== id);
    setCartItems(sisaBarang);
  };

  // Fungsi menambah/mengurangi jumlah (qty)
  const handleQuantity = (id, action) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        if (action === "tambah") return { ...item, qty: item.qty + 1 };
        if (action === "kurang" && item.qty > 1) return { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  // 4. MENGHITUNG TOTAL HARGA OTOMATIS
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Keranjang Belanja</h1>

      {cartItems.length === 0 ? (
        // Tampilan kalau keranjangnya kosong (karena dihapus semua)
        <div className="bg-white p-8 rounded-lg shadow text-center border">
          <p className="text-gray-500 mb-4 text-lg">Keranjang belanja Anda masih kosong.</p>
          <Link to="/" className="bg-[#8B0000] text-white py-2 px-6 rounded hover:bg-red-800 transition">
            Mulai Belanja Sembako
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* BAGIAN KIRI: Daftar Barang */}
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow border">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded border" />
                
                <div className="flex-1">
                  <h2 className="font-bold text-lg">{item.name}</h2>
                  <p className="text-[#8B0000] font-semibold">Rp {item.price.toLocaleString("id-ID")}</p>
                </div>

                {/* Tombol Plus Minus Qty */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleQuantity(item.id, "kurang")}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 font-bold"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.qty}</span>
                  <button 
                    onClick={() => handleQuantity(item.id, "tambah")}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Tombol Hapus */}
                <button 
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 ml-4 p-2"
                  title="Hapus Barang"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {/* BAGIAN KANAN: Ringkasan Belanja */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow border h-fit">
            <h2 className="font-bold text-xl border-b pb-3 mb-4">Ringkasan Belanja</h2>
            
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Total Harga ({cartItems.length} barang)</span>
              <span className="font-bold">Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>
            
            <div className="flex justify-between border-t pt-4 mb-6">
              <span className="font-bold text-lg">Total Tagihan</span>
              <span className="font-bold text-lg text-[#8B0000]">Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>

            <Link 
              to="/checkout"
              className="block text-center bg-[#8B0000] text-white py-3 rounded-lg font-bold hover:bg-red-800 transition w-full"
            >
              Lanjut ke Checkout ({cartItems.length})
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}