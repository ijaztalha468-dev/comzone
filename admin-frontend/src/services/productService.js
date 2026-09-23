import api from "../api/axios";

export async function getProducts() {
  const response = await api.get("/products");
  return response.data.data.products;
}

export async function addProduct(product) {
  const response = await api.post("/products", product);
  return response.data;
}

export async function editProduct(id, product) {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
}

export async function deleteProduct(id) {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}

export async function adjustStock(id, change) {
  const response = await api.patch(`/products/${id}/stock`, { change });
  return response.data;
}
