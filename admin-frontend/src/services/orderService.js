import api from "../api/axios";

export async function getOrders(limit) {
  const response = await api.get("/orders", { params: limit ? { limit } : {} });
  return response.data.data.orders;
}

export async function getOrderDetail(id) {
  const response = await api.get(`/orders/${id}`);
  return response.data.data;
}

export async function updateOrderStatus(id, status) {
  const response = await api.patch(`/orders/${id}/status`, { status });
  return response.data;
}
