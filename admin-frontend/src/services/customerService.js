import api from "../api/axios";

export async function getCustomers(limit) {
  const response = await api.get("/customers", { params: limit ? { limit } : {} });
  return response.data.data.customers;
}

export async function getOrderedCustomers() {
  const response = await api.get("/customers/ordered");
  return response.data.data.customers;
}
