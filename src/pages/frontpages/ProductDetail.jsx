import { useParams, Link } from "react-router-dom";

// 1. Import foto-foto sembakonya
import berasImg from "../../assets/beras.png";
import minyakImg from "../../assets/minyak.jpg";
import gulaImg from "../../assets/gula.jpg";

export default function ProductDetail() {
  // Mengambil ID produk dari URL (ingat: formatnya masih berupa teks/string)
  const { id } = useParams();

  // 2. Siapkan data dummy yang sama dengan di Dashboard
  // Aku tambahkan detail spesifikasi agar halamannya lebih penuh
  const products = [
    { 
      id: 1, 
      name: "Beras Premium 5kg", 
      price: 75000,
      desc: "Beras pulen berkualitas tinggi dari petani lokal pilihan. Sangat cocok untuk makan keluarga sehari-hari. Tanpa pemutih dan pengawet, sehingga lebih sehat dan aman dikonsumsi.",
      stock: 45,
      image: berasImg 
    },
    { 
      id: 2, 
      name: "Minyak Goreng 2L", 
      price: 34000,
      desc: "Minyak goreng kelapa sawit murni yang diproses dengan teknologi penyaringan tingkat tinggi. Menghasilkan minyak bening yang membuat gorengan lebih renyah dan tidak gatal di tenggorokan.",
      stock: 20,
      image: minyakImg 
    },
    { 
      id: 3, 
      name: "Gula Pasir Lokal 1kg", 
      price: 16500,
      desc: "Gula tebu asli dengan warna natural (sedikit kecoklatan) yang menandakan kemurniannya. Rasa manisnya alami, sangat pas untuk campuran teh, kopi, maupun bahan pembuatan kue.",
      stock: 150,
      image: gulaImg 
    }
  ];

  // 3. Mencari produk berdasarkan ID dari URL
  // Gunakan parseInt() karena ID dari useParams() adalah string ("1"), sedangkan di data dummy adalah angka (1)
  const product = products.find((item) => item.id === parseInt(id));

  // Jika user memasukkan ID ngawur di URL (misal: /product/99)
  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-600">Produk Tidak Ditemukan</h1>
        <p className="mt-4 text-gray-600">Maaf, barang yang Anda cari tidak ada di Kopdes kami.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 block">Kembali ke Beranda</Link>
      </div>
    );
  }

  // 4. Jika produk ditemukan, tampilkan detailnya!
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border max-w-4xl mx-auto">
      {/* Tombol Kembali */}
      <Link to="/" className="text-[#8B0000] hover:underline mb-6 inline-block font-semibold">
        &larr; Kembali ke Dashboard
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Bagian Kiri: Gambar Produk */}
        <div className="w-full md:w-1/2">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-80 object-cover rounded-lg shadow-sm border"
          />
        </div>

        {/* Bagian Kanan: Info Produk */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-3xl font-bold text-[#8B0000] mt-4">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 text-lg border-b pb-2">Deskripsi Produk</h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.desc}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <p className="text-gray-500 font-medium">Stok Tersedia: <span className="text-black">{product.stock}</span></p>
          </div>

          {/* Tombol Dummy untuk Beli */}
          <button 
            className="mt-8 bg-[#8B0000] text-white py-3 px-6 rounded-lg font-bold hover:bg-red-800 transition shadow-lg w-full md:w-auto"
            onClick={() => alert(`Anda memasukkan ${product.name} ke keranjang!`)}
          >
            + Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}