import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CartProvider } from "./utils/CartContext";
// 1. Import React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 2. Buat wadah/mesin Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 3. Bungkus aplikasi dengan QueryClientProvider */}
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <App />
        </CartProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);