import berasImg from "../assets/beras.jpg";
import minyakImg from "../assets/minyak.jpg";
import gulaImg from "../assets/gula.jpg";

const STORAGE_VERSION = "v2";
const PRODUCT_KEY = `kopdes_products_${STORAGE_VERSION}`;
const CATEGORY_KEY = `kopdes_categories_${STORAGE_VERSION}`;

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

//Ambil data produk dari Local Storage, jika tidak ada maka gunakan initialProducts
export const getProducts = () => {
  const saved = localStorage.getItem(PRODUCT_KEY);

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


//Fungsi untuk menambahkan produk baru ke Local Storage
export const addProduct = (newProduct) => {
  const current = getProducts();

  const slug = newProduct.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

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
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(updated));
  } catch (e) {
    alert("Memori penyimpanan browser penuh! Hapus beberapa data.");
  }

  return updated;
};


//Fungsi untuk memperbarui data produk di Local Storage
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

  localStorage.setItem(PRODUCT_KEY, JSON.stringify(updated));

  return updated;
};


//Fungsi untuk menghapus produk dari Local Storage
export const deleteProduct = (id) => {
  const current = getProducts();
  const updated = current.filter((item) => item.id !== id);

  localStorage.setItem(PRODUCT_KEY, JSON.stringify(updated));

  return updated;
};


//Kategori default
const initialCategories = [
  "Sembako",
  "Bahan Dapur",
  "Kebutuhan Rumah",
];

//Ambil data kategori dari Local Storage, jika tidak ada maka gunakan initialCategories
export const getCategories = () => {
  const saved = localStorage.getItem(CATEGORY_KEY);

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) return parsed;
    } catch (e) {
      console.error("Gagal parse categories", e);
    }
  }

  return initialCategories;
};

//Fungsi untuk menambahkan kategori baru ke Local Storage
export const addCategory = (newCat) => {
  const current = getCategories();

  if (!current.includes(newCat)) {
    const updated = [...current, newCat];
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(updated));
    return updated;
  }

  return current;
};


//Fungsi untuk mengurangi stok produk setelah checkout
export const reduceStockAfterCheckout = (cartItems) => {
  let products = getProducts();

  cartItems.forEach((cartItem) => {
    products = products.map((prod) => {
      if (prod.id === cartItem.id) {
        const qtyToSubtract = cartItem.quantity || cartItem.qty || 1;
        const newStock = Math.max(0, prod.stock - qtyToSubtract);

        return {
          ...prod,
          stock: newStock,
        };
      }
      return prod;
    });
  });

  localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
};