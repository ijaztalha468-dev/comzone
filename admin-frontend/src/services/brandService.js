import api from "../api/axios";

export async function getBrands() {
  const response = await api.get("/brands");
  return response.data.data.brands;
}

export async function addBrand(brand) {
  const response = await api.post("/brands", brand);
  return response.data;
}

export async function editBrand(id, brand) {
  const response = await api.put(`/brands/${id}`, brand);
  return response.data;
}

export async function deleteBrand(id) {
  const response = await api.delete(`/brands/${id}`);
  return response.data;
}
