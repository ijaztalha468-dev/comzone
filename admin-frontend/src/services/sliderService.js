import api from "../api/axios";

export async function getSlides() {
  const response = await api.get("/slides");
  return response.data.data.slides;
}

export async function addSlide(slide) {
  const response = await api.post("/slides", slide);
  return response.data;
}

export async function editSlide(id, slide) {
  const response = await api.put(`/slides/${id}`, slide);
  return response.data;
}

export async function deleteSlide(id) {
  const response = await api.delete(`/slides/${id}`);
  return response.data;
}
