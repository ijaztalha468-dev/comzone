import { createContext, useContext, useEffect, useState } from "react";

import {
  fetchCart,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
  clearCartApi,
} from "../services/cartService";

const CartContext = createContext();


export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);


  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  function toggleCart() {
    setIsCartOpen((prev) => !prev);
  }


  // Login hone par (ya page load pe agar pehle se login hai) cart load karo
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && savedUser !== "undefined") {
      loadCart();
    }
  }, []);


  async function loadCart() {
    try {
      setLoading(true);
      const { items } = await fetchCart();
      setCart(items);
    } catch (error) {
      console.error("Load Cart Error:", error);
    } finally {
      setLoading(false);
    }
  }


  async function addToCart(product) {
    const savedUser = localStorage.getItem("user");

    if (!savedUser || savedUser === "undefined") {
      alert("Cart mein add karne ke liye pehle login karein");
      return;
    }

    try {
      const { items } = await addToCartApi(product.id, 1);
      setCart(items);
    } catch (error) {
      console.error("Add To Cart Error:", error);
      alert(error.response?.data?.message || "Cart mein add nahi ho saka");
    }
  }


  async function removeFromCart(id) {
    try {
      const { items } = await removeCartItemApi(id);
      setCart(items);
    } catch (error) {
      console.error("Remove From Cart Error:", error);
    }
  }


  async function increaseQty(id) {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    try {
      const { items } = await updateCartItemApi(id, item.quantity + 1);
      setCart(items);
    } catch (error) {
      console.error("Increase Qty Error:", error);
      alert(error.response?.data?.message || "Quantity update nahi ho saki");
    }
  }


  async function decreaseQty(id) {
    const item = cart.find((item) => item.id === id);
    if (!item || item.quantity <= 1) return;

    try {
      const { items } = await updateCartItemApi(id, item.quantity - 1);
      setCart(items);
    } catch (error) {
      console.error("Decrease Qty Error:", error);
    }
  }


  async function clearCart() {
    try {
      const { items } = await clearCartApi();
      setCart(items);
    } catch (error) {
      console.error("Clear Cart Error:", error);
    }
  }


  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        loadCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  return useContext(CartContext);
}
