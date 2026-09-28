import { useState } from "react";
import { Link } from "react-router-dom";
import berasImg from "../../assets/beras.png";
import minyakImg from "../../assets/minyak.jpg";
import gulaImg from "../../assets/gula.jpg";

export default function Dashboard() {
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: "Beras Premium 5kg", 
      price: 75000,
      desc: "Beras pulen berkualitas tinggi, cocok untuk keluarga.",
      image: berasImg 
    },
    { 
      id: 2, 
      name: "Minyak Goreng 2L", 
      price: 34000,
      desc: "Minyak goreng bening untuk masakan lebih krispi.",
      image: minyakImg 
    },
    { 
      id: 3, 
      name: "Gula Pasir Lokal 1kg", 
      price: 16500,
      desc: "Gula tebu asli yang manis alami.",
      image: gulaImg 
    }
  ]);

  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = () => {
    const dataUrut = [...products].sort((a, b) => {
      return sortOrder === "asc" ? b.price - a.price : a.price - b.price;
    });
    setProducts(dataUrut);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[#8B0000] text-2xl font-bold">Dashboard Kopdes</h1>
        
        <button 
          onClick={handleSort}
          className="border-2 border-[#8B0000] text-[#8B0000] font-semibold py-1 px-4 rounded hover:bg-gray-100 transition"
        >
          Urutkan: {sortOrder === "asc" ? "Termahal" : "Termurah"}
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-[#8B0000] border rounded-lg p-4 shadow hover:shadow-lg flex flex-col justify-between">
            <div>
              {/* 3. PANGGIL GAMBARNYA SECARA DINAMIS DARI DATA DUMMY */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-3 bg-white"
              />
              <h2 className="text-[#FFFFFF] text-lg font-bold">{product.name}</h2>
              <p className="text-gray-200 text-sm mt-1 mb-2 line-clamp-2">{product.desc}</p>
            </div>
            
            <div>
              <p className="text-[#FFE600] font-bold text-lg mb-4">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
              <Link
                to={`/product/${product.id}`}
                className="bg-white text-[#8B0000] text-center font-semibold py-2 rounded block hover:bg-gray-100 transition"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}