import api from "../api/axios";

export async function getSubcategories() {
  const response = await api.get("/subcategories");
  return response.data.data.subcategories;
}
