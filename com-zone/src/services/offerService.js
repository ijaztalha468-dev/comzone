import api from "../api/axios";

export async function getOffers() {
  const response = await api.get("/offers");
  return response.data.data.offers;
}
