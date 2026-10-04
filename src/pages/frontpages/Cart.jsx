// src/pages/frontpages/Cart.jsx
import { Link } from "react-router-dom";
// 1. Panggil Context, bukan useState lagi
import { useCart } from "../../utils/CartContext";

export default function Cart() {
  // 2. Ambil data keranjang dan fungsi-fungsinya secara global
  const { cart, updateQty, removeFromCart } = useCart();

  // 3. Menghitung total harga dari data global
  const totalPrice = cart.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Keranjang Belanja</h1>

      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center border">
          <p className="text-gray-500 mb-4 text-lg">Keranjang belanja Anda masih kosong.</p>
          <Link to="/" className="bg-[#8B0000] text-white py-2 px-6 rounded hover:bg-red-800 transition">
            Mulai Belanja Sembako
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow border space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded border" />
                
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="font-bold text-lg">{item.name}</h2>
                  <p className="text-[#8B0000] font-semibold">Rp {item.price.toLocaleString("id-ID")}</p>
                </div>

                {/* Fitur Update Qty dan Hapus Item */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={item.qty} 
                      min="1" 
                      onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                      className="w-16 border rounded p-1 text-center focus:outline-none focus:border-[#8B0000]"
                    />
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded font-bold text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow border h-fit">
            <h2 className="font-bold text-xl border-b pb-3 mb-4">Ringkasan Belanja</h2>
            <div className="flex justify-between border-t pt-4 mb-6">
              <span className="font-bold text-lg">Total Tagihan</span>
              <span className="font-bold text-lg text-[#8B0000]">Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>

            <Link 
              to="/checkout"
              className="block text-center bg-[#8B0000] text-white py-3 rounded-lg font-bold hover:bg-red-800 transition w-full"
            >
              Lanjut ke Checkout
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}