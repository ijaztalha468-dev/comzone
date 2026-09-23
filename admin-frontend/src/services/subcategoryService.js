import api from "../api/axios";

export async function getSubcategories() {
  const response = await api.get("/subcategories");
  return response.data.data.subcategories;
}

export async function addSubcategory(item) {
  const response = await api.post("/subcategories", item);
  return response.data;
}

export async function editSubcategory(id, item) {
  const response = await api.put(`/subcategories/${id}`, item);
  return response.data;
}

export async function deleteSubcategory(id) {
  const response = await api.delete(`/subcategories/${id}`);
  return response.data;
}
