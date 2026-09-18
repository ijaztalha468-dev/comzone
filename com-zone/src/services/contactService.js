import api from "../api/axios";

export async function sendContactMessage(data) {
  const response = await api.post("/contact", data);
  return response.data;
}
