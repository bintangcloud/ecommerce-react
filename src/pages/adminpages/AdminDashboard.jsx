import { useState } from "react";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getCategories,
  addCategory
} from "../../utils/data";

export default function AdminDashboard() {
  const [products, setProducts] = useState(getProducts());
  const [categories, setCategories] = useState(getCategories());

  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState(categories[0] || "Sembako");
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // Tambah kategori baru
  const handleAddCategory = (e) => {
    e.preventDefault();

    if (!newCategoryInput.trim()) return;

    const updatedCats = addCategory(newCategoryInput.trim());

    setCategories(updatedCats);
    setCategory(newCategoryInput.trim());
    setNewCategoryInput("");

    setSuccessMsg("📁 Kategori baru berhasil ditambahkan!");

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Tambah / Edit produk
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !price || !stock) return;

    if (editId) {
      const updated = updateProduct(editId, {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category_name: category,
        img: imagePreview
      });

      setProducts(updated);
      setSuccessMsg("✨ Produk berhasil diperbarui!");
    } else {
      const updated = addProduct({
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category_name: category,
        img: imagePreview
      });

      setProducts(updated);
      setSuccessMsg("🎉 Produk baru berhasil ditambahkan!");
    }

    resetForm();

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Edit produk
  const handleEditClick = (prod) => {
    setEditId(prod.id);
    setName(prod.name);
    setDescription(prod.description || "");
    setPrice(prod.price);
    setStock(prod.stock);
    setCategory(prod.category_name);
    setImagePreview(prod.img);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Hapus produk
  const handleDeleteClick = (id) => {
    if (window.confirm("Apakah kamu yakin ingin menghapus produk ini?")) {
      const updated = deleteProduct(id);

      setProducts(updated);
      setSuccessMsg("🗑️ Produk berhasil dihapus!");

      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  // Reset form
  const resetForm = () => {
    setEditId(null);
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setImagePreview("");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">

      <h1 className="text-2xl font-bold text-gray-800">
        Dashboard Admin - Manajemen Sembako
      </h1>

      {/* Pesan sukses */}
      {successMsg && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-sm font-semibold shadow-sm">
          {successMsg}
        </div>
      )}

      {/* Kelola Kategori */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-[#8B0000] mb-3">
          Kelola Kategori Produk
        </h2>

        <form onSubmit={handleAddCategory} className="flex gap-2">
          <input
            type="text"
            value={newCategoryInput}
            onChange={(e) => setNewCategoryInput(e.target.value)}
            placeholder="Nama kategori baru (contoh: Minuman, Buah Segar)..."
            className="flex-1 border p-2.5 rounded-lg text-sm focus:outline-none focus:border-[#8B0000]"
          />

          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-900 transition"
          >
            + Tambah Kategori
          </button>
        </form>
      </div>

      {/* Form Produk */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">

        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold text-[#8B0000]">
            {editId
              ? "Edit Produk Sembako"
              : "Tambah Produk Sembako Baru"}
          </h2>

          {editId && (
            <button
              onClick={resetForm}
              className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 font-semibold"
            >
              Batal Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nama Produk */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nama Produk
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Telur Ayam 1 Kg"
              className="w-full border p-2.5 rounded-lg focus:outline-none focus:border-[#8B0000]"
            />
          </div>

          {/* Deskripsi Produk */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Deskripsi Produk
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="3"
              placeholder="Tuliskan spesifikasi produk (misal: Beras premium tanpa kutu...)"
              className="w-full border p-2.5 rounded-lg focus:outline-none focus:border-[#8B0000]"
            ></textarea>
          </div>

          {/* Harga dan Stok */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Harga (Rp)
              </label>

              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Contoh: 28000"
                className="w-full border p-2.5 rounded-lg focus:outline-none focus:border-[#8B0000]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Stok Tersedia
              </label>

              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Contoh: 50"
                className="w-full border p-2.5 rounded-lg focus:outline-none focus:border-[#8B0000]"
              />
            </div>

          </div>

          {/* Kategori dan Foto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pilih Kategori
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2.5 rounded-lg focus:outline-none focus:border-[#8B0000]"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Unggah Foto Produk
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border p-2 rounded-lg text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#8B0000] file:text-white hover:file:bg-red-800 cursor-pointer"
              />
            </div>

          </div>

          {/* Preview Foto */}
          {imagePreview && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">
                Pratinjau Foto:
              </p>

              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-md border shadow-sm"
              />
            </div>
          )}

          {/* Tombol Simpan */}
          <button
            type="submit"
            className="w-full bg-[#8B0000] text-white py-3 rounded-lg font-bold hover:bg-red-800 transition shadow-sm mt-2"
          >
            {editId
              ? "Simpan Perubahan Produk"
              : "Simpan Produk Baru"}
          </button>

        </form>
      </div>

      {/* Tabel Produk */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Daftar Produk Aktif
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-left border-collapse">

            <thead>
              <tr className="bg-gray-50 border-b text-gray-700 text-sm">
                <th className="p-3">Foto</th>
                <th className="p-3">Nama Produk</th>
                <th className="p-3">Deskripsi</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Harga</th>
                <th className="p-3">Stok</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y text-sm">

              {products.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition"
                >

                  <td className="p-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded border"
                    />
                  </td>

                  <td className="p-3 font-semibold text-gray-800">
                    {item.name}
                  </td>

                  <td className="p-3 text-gray-600 max-w-xs">
                    {item.description || "-"}
                  </td>

                  <td className="p-3 text-gray-600">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded font-medium">
                      {item.category_name}
                    </span>
                  </td>

                  <td className="p-3 text-[#8B0000] font-bold">
                    Rp {item.price.toLocaleString("id-ID")}
                  </td>

                  <td className="p-3 text-gray-600 font-semibold">
                    {item.stock} pcs
                  </td>

                  <td className="p-3 text-center space-x-2">

                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-700"
                    >
                      Hapus
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}