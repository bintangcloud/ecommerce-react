import { useState, useEffect } from "react";

import { useLocation, Link, useNavigate } from "react-router-dom";

import { useCart } from "../../utils/CartContext";

export default function ProductDetail() {

  const location = useLocation();

  const p = location.state; 

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [rating, setRating] = useState(0);

  const [review, setReview] = useState("");

  const [showNotif, setShowNotif] = useState(false);

  const [hasPurchased, setHasPurchased] = useState(false);

  // State untuk melacak apakah user ini sudah pernah kasih ulasan
  const [myReview, setMyReview] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  // data ulasan untuk hitung rata-rata rating
  const [avgRating, setAvgRating] = useState(0);

  const [totalSold, setTotalSold] = useState(0);

  // Inisialisasi state reviews
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


  // TAMBAHAN: Tambah ke keranjang
  const handleAddToCart = () => {

    addToCart(p);

    setShowNotif(true);

    setTimeout(() => setShowNotif(false), 2500);

  };


  // TAMBAHAN: Beli sekarang
  const handleBeliSekarang = () => {

    navigate("/checkout", {
      state: {
        directBuyItem: p
      }
    });

  };


  // TAMBAHAN: Submit ulasan
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


  const handleEdit = () => {

    setRating(myReview.rating);

    setReview(myReview.review);

    setIsEditing(true);

  };


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


  if (!p) {

    return (

      <div className="text-center py-20">

        <h1 className="text-2xl font-bold text-red-600">
          Produk Tidak Ditemukan
        </h1>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#8B0000] font-semibold transition-colors"
        >

          <span>❮</span> Kembali

        </Link>

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


      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-8">

        {/* Navigasi Kembali */}

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#8B0000] font-semibold transition-colors"
        >

          <span>❮</span> Kembali

        </Link>


        {/* DETAIL PRODUK UTAMA */}

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


              <div className="flex gap-3 mt-6">

                <button 
                  onClick={handleAddToCart} 
                  className="flex-1 border-2 border-[#8B0000] text-[#8B0000] hover:bg-red-50 py-3 rounded-xl font-bold transition-all active:scale-95"
                >

                  + Keranjang

                </button>

                <button 
                  onClick={handleBeliSekarang} 
                  className="flex-1 bg-[#8B0000] text-white hover:bg-red-800 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95"
                >

                  Beli Sekarang

                </button>

              </div>

            </div>

          </div>

        </div>


        {/* BAGIAN BAWAH: ULASAN & FORM TULIS ULASAN YANG LEBIH RAPI */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* KOLOM KIRI (Lebih luas): Daftar Ulasan */}

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


          {/* KOLOM KANAN: Kotak Aksi / Form Ulasan */}

          <div className="bg-white p-6 md:p-8 border border-gray-100 rounded-3xl shadow-sm h-fit space-y-4">

            <h3 className="text-xl font-bold text-gray-800 border-b pb-3">
              Ulasan Anda
            </h3>

            {!hasPurchased ? (

              /* Belum Pernah Beli */

              <div className="text-center py-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 px-4">

                <span className="text-4xl mb-2 block">
                  🔒
                </span>

                <p className="text-xs text-gray-600 font-medium">

                  Selesaikan pembelian produk ini terlebih dahulu untuk menulis ulasan.

                </p>

              </div>

            ) : myReview && !isEditing ? (

              /* Sudah Pernah Ulas & Tidak Sedang Diedit */

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

                  <button 
                    onClick={handleEdit} 
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold text-xs transition"
                  >

                    Edit Ulasan

                  </button>

                  <button 
                    onClick={handleDelete} 
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl font-bold text-xs transition"
                  >

                    Hapus

                  </button>

                </div>

              </div>

            ) : (

              /* Form Input (Muncul jika Belum Ulas ATAU Sedang Edit) */

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

                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)} 
                      className="w-1/3 bg-gray-100 text-gray-600 py-2.5 rounded-xl font-bold text-xs"
                    >

                      Batal

                    </button>

                  )}

                  <button 
                    type="submit" 
                    className="flex-1 bg-[#8B0000] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-red-800 transition"
                  >

                    {isEditing ? "Simpan Perubahan" : "Kirim Ulasan"}

                  </button>

                </div>

              </form>

            )}

          </div>

        </div>

      </div>

    </>

  );

}