// src/utils/data.js
import berasImg from "../assets/beras.png";
import minyakImg from "../assets/minyak.jpg";
import gulaImg from "../assets/gula.jpg";

export const products = [
  {
    id: 1,
    name: "Beras Premium 5kg",
    slug: "beras-premium-5kg",
    price: 75000,
    stock: 45,
    category: 1,
    category_name: "Sembako",
    rating: 5,
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
    img: gulaImg,
  }
];