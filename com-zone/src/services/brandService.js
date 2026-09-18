import api from "../api/axios";

export async function getBrands() {
  const response = await api.get("/brands");
  return response.data.data.brands;
}
