import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { getProducts } from "../../utils/data";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart } = useCart();
  const latestProducts = getProducts();
  const totalPrice = cart.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    
    <div className="max-w-5xl mx-auto p-6">
    <BackButton to="/" />

      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Keranjang Belanja</h1>

      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center border">
          <p className="text-gray-500 mb-4 text-lg">Keranjang belanja Anda masih kosong.</p>
        <Button onClick={() => navigate("/")} className="mx-auto mt-4">
            Mulai Belanja
        </Button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">

          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow border space-y-4">
            {cart.map((item) => {
              // Cari stok produk paling update
              const currentProd = latestProducts.find((p) => p.id === item.id);
              const currentStock = currentProd ? currentProd.stock : item.stock;
              const isOutOrStock = currentStock === 0;      

              return (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
  
                  {/* GAMBAR PRODUK BISA DIKLIK */}
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    onClick={() => navigate(`/product/${item.slug || item.id}`, { state: item })}
                    className="w-20 h-20 object-cover rounded border cursor-pointer hover:opacity-80 transition" 
                  />
                  
                  <div className="flex-1 text-center sm:text-left">
                    {/* NAMA PRODUK BISA DIKLIK */}
                    <h2 
                      onClick={() => navigate(`/product/${item.slug || item.id}`, { state: item })}
                      className="font-bold text-lg cursor-pointer hover:text-[#8B0000] transition inline-block"
                    >
                      {item.name}
                    </h2>
                    
                    <p className="text-[#8B0000] font-semibold">Rp {item.price.toLocaleString("id-ID")}</p>
                    {/* INDIKATOR STOK HABIS DI KERANJANG */}
                    {isOutOrStock ? (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold mt-1 inline-block">
                        Stok Habis! 
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500 mt-1 inline-block">
                        Sisa Stok: {currentStock}
                      </span>
                    )}
                </div>

                {/* Fitur Update Qty dan Hapus Item */}
                <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Button 
                      variant="secondary"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-2.5 py-1 text-xs"
                    >
                      -
                    </Button>

                    <input 
                      type="number" 
                      value={item.qty} 
                      min="1" 
                      max={currentStock}
                      onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 1)}
                      className="w-12 border rounded p-1 text-center text-sm focus:outline-none focus:border-[#8B0000]"
                    />

                    <Button 
                      variant="secondary"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      disabled={item.qty >= currentStock} // Matikan tombol + jika sudah mencapai batas stok
                      className="px-2.5 py-1 text-xs"
                    >
                      +
                    </Button>
                  </div>
                  <Button 
                    variant="danger" 
                    onClick={() => removeFromCart(item.id)} 
                    className="px-3 py-1"
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            )})}
          </div>

          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow border h-fit">
            <h2 className="font-bold text-xl border-b pb-3 mb-4">Ringkasan Belanja</h2>
            <div className="flex justify-between border-t pt-4 mb-6">
              <span className="font-bold text-lg">Total Tagihan</span>
              <span className="font-bold text-lg text-[#8B0000]">Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>

          <Button onClick={() => navigate("/checkout")} className="w-full">
              Checkout
          </Button>
          </div>

        </div>
      )}
    </div>
  );
}