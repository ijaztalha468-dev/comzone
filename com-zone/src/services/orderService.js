import api from "../api/axios";

// Login user ke saare orders (list) - My Orders page ke liye
export async function getUserOrders() {
  const response = await api.get("/orders");
  return response.data; // { success, data: { orders } }
}

// Checkout form ka data leta hai, backend ko order create request bhejta hai 
// Ek order ki poori detail backend se laata hai (status, items, total)
export async function getOrder(orderId) {
  const response = await api.get(`/orders/${orderId}`);
  return response.data; // { success, data: { order, items } }
}
export async function placeOrder({
  firstName,
  lastName,
  email,
  phone,
  address,
  city,
  paymentMethod,
}) {
  const response = await api.post("/orders", {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    paymentMethod,
  });

  return response.data; // { success, message, data: { orderId, totalAmount } }
}