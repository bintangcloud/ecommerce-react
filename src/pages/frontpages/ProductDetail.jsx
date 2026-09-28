import { useParams } from "react-router-dom";

export default function ProductDetail() {
  {/* Mengambil ID produk dari URL */}
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Detail Produk {id}</h1>
      <p className="mt-4">Beli biar saya untung {id}</p>
    </div>
  );
}