import api from "../api/axios";
import { saveCartMirror } from "./localStorageDB";

function mapCartItem(item) {
  return {
    id: item.ProductId,
    cartItemId: item.CartItemId,
    name: item.Name,
    price: item.Price,
    image: item.ImageUrl,
    quantity: item.Quantity,
    stockCount: item.Stock,
  };
}

function mapCartResponse(data) {
  const items = (data?.items || []).map(mapCartItem);
  const summary = data?.summary || { subtotal: 0, itemCount: 0 };
  return { items, summary };
}

function getCurrentUserId() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw || raw === "undefined") return null;
    return JSON.parse(raw)?.id || null;
  } catch {
    return null;
  }
}

function mirror(items) {
  const userId = getCurrentUserId();
  if (userId) saveCartMirror(userId, items);
}

// Poora cart backend se laata hai + mirror update karta hai
export async function fetchCart() {
  const response = await api.get("/cart");
  const result = mapCartResponse(response.data.data);
  mirror(result.items);
  return result;
}

// Product ko cart mein add karta hai (backend) + mirror update
export async function addToCartApi(productId, quantity = 1) {
  const response = await api.post("/cart", { productId, quantity });
  const result = mapCartResponse(response.data.data);
  mirror(result.items);
  return result;
}

// Quantity update karta hai (backend) + mirror update
export async function updateCartItemApi(productId, quantity) {
  const response = await api.put(`/cart/${productId}`, { quantity });
  const result = mapCartResponse(response.data.data);
  mirror(result.items);
  return result;
}

// Item remove karta hai (backend) + mirror update
export async function removeCartItemApi(productId) {
  const response = await api.delete(`/cart/${productId}`);
  const result = mapCartResponse(response.data.data);
  mirror(result.items);
  return result;
}

// Poora cart clear karta hai (backend) + mirror update
export async function clearCartApi() {
  const response = await api.delete("/cart");
  const result = mapCartResponse(response.data.data);
  mirror(result.items);
  return result;
}
