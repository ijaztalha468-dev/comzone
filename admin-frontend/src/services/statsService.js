import api from "../api/axios";

export async function getStats() {
  const response = await api.get("/stats");
  return response.data.data;
}
