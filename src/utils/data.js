import berasImg from "../assets/beras.png";
import minyakImg from "../assets/minyak.jpg";
import gulaImg from "../assets/gula.jpg";

export const initialProducts = [
  {
    id: 1,
    name: "Beras Premium 5kg",
    slug: "beras-premium-5kg",
    price: 75000,
    stock: 45,
    category: 1,
    category_name: "Sembako",
    rating: 5,
    description:
      "Beras premium berkualitas dengan tekstur pulen dan cocok untuk konsumsi sehari-hari.",
    img: berasImg,
  },

  {
    id: 2,
    name: "Minyak Goreng 2L",
    slug: "minyak-goreng-2l",
    price: 34000,
    stock: 20,
    category: 1,
    category_name: "Sembako",
    rating: 4,
    description:
      "Minyak goreng berkualitas untuk kebutuhan memasak sehari-hari.",
    img: minyakImg,
  },

  {
    id: 3,
    name: "Gula Pasir Lokal 1kg",
    slug: "gula-pasir-lokal-1kg",
    price: 16500,
    stock: 150,
    category: 2,
    category_name: "Bahan Dapur",
    rating: 4,
    description:
      "Gula pasir lokal berkualitas dengan rasa manis yang cocok untuk berbagai kebutuhan.",
    img: gulaImg,
  },
];


// ==============================
// GET PRODUCTS
// ==============================

export const getProducts = () => {
  const saved = localStorage.getItem("kopdes_products");

  if (saved) {
    try {
      const parsed = JSON.parse(saved);

      if (parsed.length > 0) return parsed;
    } catch (e) {
      console.error("Gagal parse local storage", e);
    }
  }

  return initialProducts;
};


// ==============================
// CREATE PRODUCT
// ==============================

export const addProduct = (newProduct) => {
  const current = getProducts();

  const slug = newProduct.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  // Jika gambar Base64 terlalu besar,
  // gunakan gambar default agar tidak memenuhi localStorage
  let safeImg = newProduct.img;

  if (safeImg && safeImg.length > 500000) {
    safeImg =
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80";
  }

  const productWithId = {
    ...newProduct,
    id: Date.now(),
    slug,
    img:
      safeImg ||
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80",
  };

  const updated = [productWithId, ...current];

  try {
    localStorage.setItem(
      "kopdes_products",
      JSON.stringify(updated)
    );
  } catch (e) {
    alert("Memori penyimpanan browser penuh! Hapus beberapa data.");
  }

  return updated;
};


// ==============================
// UPDATE PRODUCT
// ==============================

export const updateProduct = (id, updatedData) => {
  const current = getProducts();

  const updated = current.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...updatedData,

        slug: updatedData.name
          ? updatedData.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
          : item.slug,

        img: updatedData.img || item.img,
      };
    }

    return item;
  });

  localStorage.setItem(
    "kopdes_products",
    JSON.stringify(updated)
  );

  return updated;
};


// ==============================
// DELETE PRODUCT
// ==============================

export const deleteProduct = (id) => {
  const current = getProducts();

  const updated = current.filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    "kopdes_products",
    JSON.stringify(updated)
  );

  return updated;
};


// ==============================
// KATEGORI
// ==============================

const initialCategories = [
  "Sembako",
  "Bahan Dapur",
  "Kebutuhan Rumah",
];

export const getCategories = () => {
  const saved = localStorage.getItem("kopdes_categories");

  if (saved) {
    const parsed = JSON.parse(saved);

    if (parsed.length > 0) return parsed;
  }

  return initialCategories;
};


export const addCategory = (newCat) => {
  const current = getCategories();

  if (!current.includes(newCat)) {
    const updated = [...current, newCat];

    localStorage.setItem(
      "kopdes_categories",
      JSON.stringify(updated)
    );

    return updated;
  }

  return current;
};


// ==============================
// REDUCE STOCK AFTER CHECKOUT
// ==============================

export const reduceStockAfterCheckout = (cartItems) => {
  let products = getProducts();

  cartItems.forEach((cartItem) => {
    products = products.map((prod) => {
      if (prod.id === cartItem.id) {
        const newStock = Math.max(
          0,
          prod.stock - cartItem.qty
        );

        return {
          ...prod,
          stock: newStock,
        };
      }

      return prod;
    });
  });

  localStorage.setItem(
    "kopdes_products",
    JSON.stringify(products)
  );
};
