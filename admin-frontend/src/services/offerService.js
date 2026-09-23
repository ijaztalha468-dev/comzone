import api from "../api/axios";

export async function getOffers() {
  const response = await api.get("/offers");
  return response.data.data.offers;
}

export async function addOffer(offer) {
  const response = await api.post("/offers", offer);
  return response.data;
}

export async function editOffer(id, offer) {
  const response = await api.put(`/offers/${id}`, offer);
  return response.data;
}

export async function deleteOffer(id) {
  const response = await api.delete(`/offers/${id}`);
  return response.data;
}
