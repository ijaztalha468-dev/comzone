import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./css/App.css";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FlyToCartProvider } from "./context/FlyToCartContext";


ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <BrowserRouter>

      <ThemeProvider>

        <AuthProvider>

          <CartProvider>

            <FlyToCartProvider>

              <App />

            </FlyToCartProvider>

          </CartProvider>

        </AuthProvider>

      </ThemeProvider>

    </BrowserRouter>

  </React.StrictMode>

);