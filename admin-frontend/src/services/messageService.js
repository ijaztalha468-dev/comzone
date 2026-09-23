import api from "../api/axios";

export async function getMessages() {
  const response = await api.get("/messages");
  return response.data.data.messages;
}

export async function deleteMessage(id) {
  const response = await api.delete(`/messages/${id}`);
  return response.data;
}
