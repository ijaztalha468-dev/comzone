import api from "../api/axios";

export async function getPromoCards() {
  const response = await api.get("/promo-cards");
  return response.data.data.promoCards;
}
