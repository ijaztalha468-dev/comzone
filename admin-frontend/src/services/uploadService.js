import api from "../api/axios";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.url; // full URL, seedha ImageUrl field mein save karne ke liye
}
