import api from "../api/axios";

export async function getPromoCards() {
  const response = await api.get("/promo-cards");
  return response.data.data.promoCards;
}

export async function addPromoCard(card) {
  const response = await api.post("/promo-cards", card);
  return response.data;
}

export async function editPromoCard(id, card) {
  const response = await api.put(`/promo-cards/${id}`, card);
  return response.data;
}

export async function deletePromoCard(id) {
  const response = await api.delete(`/promo-cards/${id}`);
  return response.data;
}
