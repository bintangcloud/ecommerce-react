import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import WarningAlert from "../../components/WarningAlert";

export default function ProductDetail() {
const location = useLocation();
const p = location.state; 
const navigate = useNavigate();
const { cart, addToCart } = useCart();
const [rating, setRating] = useState(0);
const [review, setReview] = useState("");
const [showNotif, setShowNotif] = useState(false);
const [hasPurchased, setHasPurchased] = useState(false);
const [myReview, setMyReview] = useState(null);
const [isEditing, setIsEditing] = useState(false);
const [avgRating, setAvgRating] = useState(0);
const [totalSold, setTotalSold] = useState(0);
const [qty, setQty] = useState(1);
const cartItem = cart.find((item) => item.id === p.id);
const qtyInCart = cartItem ? cartItem.qty : 0;
const remainingStock = Math.max(0, p.stock - qtyInCart);
const [warningMsg, setWarningMsg] = useState("");
const [showWarning, setShowWarning] = useState(false);

// Ambil ulasan dari localStorage saat komponen dimuat
  const [reviews, setReviews] = useState(() => {
    if (!p) return [];
    const savedReviews = localStorage.getItem(`kopdes_reviews_${p.id}`);
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  // Cek riwayat belanja & ulasan saya
  useEffect(() => {
    if (p) {
      localStorage.setItem(
        `kopdes_reviews_${p.id}`,
        JSON.stringify(reviews)
      );

      // Cek apakah sudah pernah membeli
      const riwayatBelanja =
        JSON.parse(localStorage.getItem("kopdes_riwayat_belanja")) || [];
      if (riwayatBelanja.includes(p.id)) {

        setHasPurchased(true);

      }

      // Cek apakah sudah pernah memberikan ulasan
      const existingMyReview = reviews.find(
        (r) => r.isMine === true
      );

      if (existingMyReview) {

        setMyReview(existingMyReview);

      }

      // Hitung rata-rata rating
      if (reviews.length > 0) {

        const sum = reviews.reduce(
          (acc, curr) => acc + curr.rating,
          0
        );

        setAvgRating((sum / reviews.length).toFixed(1));

      } else {
        setAvgRating(0);
      }

      // Ambil jumlah produk terjual
      const soldData =
        JSON.parse(localStorage.getItem("kopdes_product_sold")) || {};
      setTotalSold(soldData[p.id] || 0);
    }
  }, [reviews, p]);


  // Tambah ke keranjang
  const handleAddToCart = () => {
  const success = addToCart(p, qty);

  if (success) {
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 2000);
  } else {
    setWarningMsg("Jumlah yang ingin kamu masukkan melebihi sisa stok yang tersedia di keranjang!");
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 3000);
  }
};


  // Beli sekarang
  const handleBeliSekarang = () => {
  const itemToBuy = { ...p, qty: qty };
  navigate("/checkout", {
    state: {
      directBuyItem: itemToBuy
    }
  });
};


  // Submit ulasan
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      alert("Mohon berikan bintang (rating) terlebih dahulu!");
      return;
    }

    if (isEditing && myReview) {

      // Update ulasan lama
      const updatedReviews = reviews.map((r) =>
        r.id === myReview.id
          ? { ...r, rating, review }
          : r
      );

      setReviews(updatedReviews);

      setMyReview({
        ...myReview,
        rating,
        review
      });

      setIsEditing(false);

    } else {

      // Buat ulasan baru
      const newReview = {
        id: Date.now(),
        rating,
        review,
        isMine: true
      };

      setReviews([...reviews, newReview]);
      setMyReview(newReview);
    }

    setRating(0);
    setReview("");

  };

  // Edit ulasan
  const handleEdit = () => {
    setRating(myReview.rating);
    setReview(myReview.review);
    setIsEditing(true);

  };

// Hapus ulasan
  const handleDelete = () => {
    if (confirm("Hapus ulasanmu?")) {
      const filtered = reviews.filter(
        (r) => r.id !== myReview.id
      );

      setReviews(filtered);
      setMyReview(null);
      setIsEditing(false);

    }
  };

  // Jika produk tidak ditemukan, tampilkan pesan
  if (!p) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-600">
          Produk Tidak Ditemukan
        </h1>

        <BackButton to="/" />

      </div>
    );
  }


  return (
    <>
      {/* NOTIFIKASI BESAR DI TENGAH LAYAR */}

      {showNotif && (

        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none bg-black/20 backdrop-blur-sm transition-all">
          <div className="bg-[#424242]/95 text-white w-80 md:w-96 p-10 flex flex-col items-center justify-center gap-6 shadow-2xl rounded-xl animate-fade-in-up">
            <div className="bg-[#00c49a] rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
              <svg 
                className="w-10 h-10 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth="4"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-center">
              Produk telah ditambahkan ke keranjang
            </p>
          </div>
        </div>
      )}
      <WarningAlert message={warningMsg} show={showWarning} />


      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-8">
        <BackButton to="/" />

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight ml-1">
          Detail <span className="text-[#8B0000]">Produk</span>
        </h1>
        <div className="border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm bg-white">
          <div className="flex flex-col md:flex-row gap-8">
            <img 
              src={p.img} 
              alt={p.name} 
              className="w-full md:w-1/2 h-72 object-cover rounded-2xl border border-gray-100" 
            />
            
            <div className="flex-1 flex flex-col justify-center">

              <span className="text-xs font-bold bg-red-50 text-[#8B0000] px-3 py-1.5 rounded-full w-max mb-3">
                {p.category_name}
              </span>

              <h1 className="text-3xl font-extrabold text-gray-800">
                {p.name}
              </h1>

              <p className="text-3xl font-black text-[#8B0000] mt-3">
                Rp {p.price.toLocaleString("id-ID")}
              </p>

              <p className="text-gray-500 mt-2 font-medium">
                Stok Tersedia: {p.stock}
              </p>


              {/* RATING & TERJUAL DI DETAIL PRODUK */}
              <div className="flex items-center gap-4 my-3 text-sm">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100">
                  <span className="text-yellow-500 font-bold text-base">
                    ★
                  </span>
                  <span className="font-bold text-gray-800">
                    {avgRating > 0 ? avgRating : "0.0"}
                  </span>
                  <span className="text-gray-500">
                    ({reviews.length} ulasan)
                  </span>
                </div>

                <div className="text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-lg">

                  Terjual{" "}
                  <span className="font-bold text-gray-800">
                    {totalSold}
                  </span>{" "}
                  pcs
                </div>
              </div>


              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="font-bold text-gray-800 mb-1 text-sm">
                  Deskripsi Produk:
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {p.description || "Admin belum menambahkan detail spesifik untuk produk ini."}
                </p>
              </div>

              {/* Kuantitas yg masuk keranjang */}
              <div className="flex items-center gap-4 my-4">
                <span className="text-sm font-bold text-gray-700">Jumlah:</span>
              <div className="flex items-center gap-2">
                <Button 
                  variant="secondary"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-1.5 text-xs"
                >
                  -
                </Button>
                
                <input 
                  type="number" 
                  value={qty} 
                  min="1" 
                  max={remainingStock} // Batasi sesuai sisa stok yang belum masuk keranjang
                  onChange={(e) => setQty(Math.max(1, Math.min(remainingStock, parseInt(e.target.value) || 1)))}
                  className="w-14 border border-gray-200 rounded-xl p-2 text-center text-sm font-bold focus:outline-none focus:border-[#8B0000]"
                />

                <Button 
                  variant="secondary"
                  onClick={() => setQty(Math.min(remainingStock, qty + 1))}
                  disabled={qty >= remainingStock || remainingStock === 0}
                  className="px-3 py-1.5 text-xs"
                >
                  +
                </Button>
              </div>
              <span className="text-xs text-gray-500">
                {remainingStock === 0 ? "Sudah maksimal di keranjang" : `Sisa bisa ditambah ke keranjang: ${remainingStock}`}
              </span>
            </div>


              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline"
                  onClick={handleAddToCart} 
                  disabled={p.stock === 0}
                  className="flex-1"
                >
                  + Keranjang
                </Button>

                <Button 
                  variant="primary"
                  onClick={handleBeliSekarang} 
                  disabled={p.stock === 0}
                  className="flex-1"
                >
                  {p.stock === 0 ? "Stok Habis" : "Beli Sekarang"}
                </Button>
              </div>
            </div>
          </div>
        </div>


        {/* BAGIAN BAWAH: ULASAN & FORM TULIS ULASAN YANG LEBIH RAPI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/*Daftar Ulasan */}
          <div className="md:col-span-2 bg-white p-6 md:p-8 border border-gray-100 rounded-3xl shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Ulasan Pembeli ({reviews.length})
            </h2>

            {reviews.length === 0 ? (

              <p className="text-gray-500 italic">
                Belum ada ulasan untuk produk ini.
              </p>
            ) : (

              <ul className="space-y-6">
                {reviews.map((r) => (
                  <li 
                    key={r.id} 
                    className="border-b border-gray-100 pb-5 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex gap-1">
                        {[...Array(r.rating)].map((_, i) => (
                          <span 
                            key={i} 
                            className="text-yellow-400 text-base"
                          >
                            ★
                          </span>
                        ))}

                        {[...Array(5 - r.rating)].map((_, i) => (

                          <span 
                            key={i} 
                            className="text-gray-200 text-base"
                          >
                            ★
                          </span>

                        ))}

                      </div>

                      {r.isMine && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-semibold">
                          Ulasan Anda
                        </span>
                      )}

                    </div>

                    {r.review && (
                      <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                        {r.review}
                      </p>
                    )}

                  </li>

                ))}

              </ul>

            )}

          </div>


          {/* Form Ulasan */}
          <div className="bg-white p-6 md:p-8 border border-gray-100 rounded-3xl shadow-sm h-fit space-y-4">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-3">
              Ulasan Anda
            </h3>

            {!hasPurchased ? (

              //Belum Pernah Beli 

              <div className="text-center py-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 px-4">
                <span className="text-4xl mb-2 block">
                  🔒
                </span>

                <p className="text-xs text-gray-600 font-medium">
                  Selesaikan pembelian produk ini terlebih dahulu untuk menulis ulasan.
                </p>
              </div>
            ) : myReview && !isEditing ? (

              //Sudah Pernah Ulas & Tidak Sedang Diedit 
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100 text-center">

                  <p className="text-sm font-bold text-green-800 mb-1">
                    ✓ Anda sudah mengulas produk ini
                  </p>

                  <div className="flex justify-center gap-1 my-2">

                    {[...Array(myReview.rating)].map((_, i) => (

                      <span 
                        key={i} 
                        className="text-yellow-400"
                      >
                        ★
                      </span>

                    ))}

                  </div>

                  {myReview.review && (
                    <p className="text-xs text-gray-600 italic">
                      "{myReview.review}"
                    </p>
                  )}

                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" onClick={handleEdit} className="flex-1 text-xs">
                    Edit Ulasan
                  </Button>
                  <Button variant="danger" onClick={handleDelete} className="flex-1 text-xs">
                    Hapus
                  </Button>
                </div>

              </div>

            ) : (

              //Form Input (Muncul jika Belum Ulas ATAU Sedang Edit)
              <form 
                onSubmit={handleSubmit} 
                className="space-y-4"
              >
                <div>

                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Beri Rating Bintang *
                  </label>

                  <div className="flex gap-1">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <button
                        type="button" 
                        key={star} 
                        onClick={() => setRating(star)}
                        className={`text-3xl ${
                          star <= rating
                            ? "text-yellow-400 scale-110"
                            : "text-gray-200"
                        } hover:scale-125 transition-transform`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>


                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Tulis Komentar (Opsional)
                  </label>
                  <textarea
                    value={review} 
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#8B0000] bg-gray-50" 
                    rows="3" 
                    placeholder="Ceritakan pengalamanmu..."
                  >
                  </textarea>

                </div>

                <div className="flex gap-2">
                {isEditing && (
                  <Button variant="secondary" onClick={() => setIsEditing(false)} className="w-1/3 text-xs">
                    Batal
                  </Button>
                )}
                <Button type="submit" className="text-xs">
                  {isEditing ? "Simpan Perubahan" : "Kirim Ulasan"}
                </Button>
              </div>

              </form>

            )}

          </div>
        </div>
      </div>
    </>
  );
}