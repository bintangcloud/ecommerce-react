export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin Kopdes</h1>
      
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Simulasi Input Tambah Barang</h2>
        
        {/* Form Input Dummy */}
        <form className="flex flex-col gap-4 max-w-md">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nama Barang</label>
            <input 
              type="text" 
              placeholder="Contoh: Minyak Sawit" 
              className="w-full border p-2 rounded-lg focus:outline-none focus:border-[#8B0000]"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Harga</label>
            <input 
              type="number" 
              placeholder="Contoh: 35000" 
              className="w-full border p-2 rounded-lg focus:outline-none focus:border-[#8B0000]"
            />
          </div>

          <button 
            type="button" 
            className="bg-[#8B0000] text-white py-2 px-4 rounded-lg hover:bg-red-800 transition"
            onClick={() => alert("Simulasi: Data berhasil disimpan!")}
          >
            Simpan Barang
          </button>
        </form>
        
      </div>
    </div>
  );
}