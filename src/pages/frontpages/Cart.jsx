import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { getProducts } from "../../utils/data";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart } = useCart();
  const latestProducts = getProducts();
  const [selectedItems, setSelectedItems] = useState(() => cart.map(item => item.id));

  // Fungsi untuk handle klik per item
  const handleSelectItem = (id) => {
    setSelectedItems((prev) => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  // Daftar barang yang valid (stok > 0)
  const inStockItems = cart.filter(item => {
    const currentProd = latestProducts.find((p) => p.id === item.id);
    const stock = currentProd ? currentProd.stock : item.stock;
    return stock > 0;
  });

  // Fungsi untuk handle klik "Pilih Semua"
  const handleSelectAll = () => {
    if (selectedItems.length === inStockItems.length) {
      setSelectedItems([]); // Hapus semua ceklis
    } else {
      setSelectedItems(inStockItems.map(item => item.id)); // Ceklis semua barang yg ada stoknya
    }
  };

  // Kalkulasi hanya untuk barang yang di-ceklis
  const checkedItems = inStockItems.filter(item => selectedItems.includes(item.id));
  const totalPrice = checkedItems.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col items-start gap-3 mb-8">
        <BackButton to="/" />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight ml-1">
          Keranjang <span className="text-[#8B0000]">Belanja</span>
        </h1>
      </div>

      {cart.length === 0 ? (
        // Empty State 
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#8B0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjangmu masih kosong!</h2>
          <p className="text-gray-500 mb-8 max-w-md">Temukan berbagai kebutuhan sembako segar dan berkualitas untuk kebutuhan harianmu.</p>
          <Button onClick={() => navigate("/")} className="px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Mulai Belanja Sekarang
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Daftar Produk (Kiri) */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            
            {/* Header: Pilih Semua */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedItems.length === inStockItems.length && inStockItems.length > 0}
                  onChange={handleSelectAll}
                  className="w-5 h-5 accent-[#8B0000] rounded cursor-pointer"
                />
                <span className="font-bold text-gray-800">Pilih Semua ({cart.length})</span>
              </label>
            </div>

            {/* List Barang */}
            <div className="space-y-4">
              {cart.map((item) => {
                const currentProd = latestProducts.find((p) => p.id === item.id);
                const currentStock = currentProd ? currentProd.stock : item.stock;
                const isOutOrStock = currentStock === 0;      

                return (
                  <div key={item.id} className="group bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden">
                    
                    {/* CHECKBOX ITEM & GAMBAR */}
                    <div className="flex items-center gap-4 shrink-0">
                      <input 
                        type="checkbox" 
                        disabled={isOutOrStock}
                        checked={selectedItems.includes(item.id) && !isOutOrStock}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-5 h-5 accent-[#8B0000] rounded cursor-pointer disabled:opacity-40"
                      />
                      <div className="relative">
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          onClick={() => navigate(`/product/${item.slug || item.id}`, { state: item })}
                          className={`w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl cursor-pointer transition-transform duration-300 ${isOutOrStock ? 'opacity-50 grayscale' : 'group-hover:scale-105'}`} 
                        />
                        {isOutOrStock && (
                          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] rounded-xl flex items-center justify-center">
                            <span className="bg-red-600 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded shadow-sm">Habis</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* DETAIL PRODUK */}
                    <div className="flex-1 flex flex-col justify-between w-full">
                      <div className="flex justify-between items-start w-full gap-4">
                        <div className="space-y-1">
                          <h2 
                            onClick={() => navigate(`/product/${item.slug || item.id}`, { state: item })}
                            className="font-bold text-lg text-gray-900 cursor-pointer hover:text-[#8B0000] transition-colors line-clamp-2"
                          >
                            {item.name}
                          </h2>
                          <p className="text-[#8B0000] font-extrabold text-lg">Rp {item.price.toLocaleString("id-ID")}</p>
                          {!isOutOrStock && (
                            <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                              Sisa Stok: {currentStock}
                            </span>
                          )}
                        </div>

                        {/* TOMBOL HAPUS */}
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                          title="Hapus dari keranjang"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      {/* KONTROL KUANTITAS (Pill Style) */}
                      <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end w-full">
                        <div className={`flex items-center bg-gray-100 rounded-full p-1 border border-gray-200 ${isOutOrStock ? 'opacity-50 pointer-events-none' : ''}`}>
                          <button 
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            disabled={item.qty <= 1}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm hover:text-gray-900 disabled:opacity-50 transition-all"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                          </button>
                          
                          <input 
                            type="number" 
                            value={item.qty} 
                            min="1" 
                            max={currentStock}
                            onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 1)}
                            className="w-12 bg-transparent text-center text-sm font-bold text-gray-800 focus:outline-none"
                          />

                          <button 
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            disabled={item.qty >= currentStock} 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm hover:text-[#8B0000] disabled:opacity-50 transition-all"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Ringkasan Belanja (Kanan) - Sticky Column */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-bold text-xl text-gray-900 mb-6">Ringkasan Belanja</h2>
              
              <div className="space-y-4 text-gray-600 border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between items-center">
                  <span>Total Harga ({checkedItems.length} Barang)</span>
                  <span className="font-medium">Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-gray-900">Total Tagihan</span>
                <span className="font-extrabold text-2xl text-[#8B0000] leading-none">Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>

              {/* Kirim HANYA data barang yang di-ceklis ke halaman Checkout */}
              <Button 
                onClick={() => navigate("/checkout", { state: { selectedItemsForCheckout: checkedItems } })} 
                disabled={checkedItems.length === 0}
                className="w-full py-4 text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Lanjut ke Checkout
              </Button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}