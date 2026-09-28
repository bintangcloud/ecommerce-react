import { Link } from "react-router-dom";
import sembako from "../../assets/sembako.jpg";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-[#8B0000] text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((id) => (
          <div key={id} className="bg-[#8B0000] border rounded-lg p-4 shadow hover:shadow-lg">
            <img
              src={sembako}
              alt="Produk"
              className="w-full h-48 object-cover"
            />
            <h2 className="text-[#FFFFFF] font-semibold">Produk {id}</h2>
            <p className="text-[#FFFFFF]">Ini adalah produk di kopdes kami, beli ya {id}</p>
            <Link
              to={`/product/${id}`}
              className="text-[#FFFFFF] hover:underline mt-2 block"
            >
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}