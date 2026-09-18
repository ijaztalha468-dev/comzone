import api from "../api/axios";

export async function getSlides() {
  const response = await api.get("/slides");
  return response.data.data.slides;
}
