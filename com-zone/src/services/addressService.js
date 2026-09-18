import api from "../api/axios";

export async function getAddresses() {
  const response = await api.get("/addresses");
  return response.data.data.addresses;
}

export async function addAddress(address) {
  const response = await api.post("/addresses", address);
  return response.data;
}

export async function editAddress(id, address) {
  const response = await api.put(`/addresses/${id}`, address);
  return response.data;
}

export async function deleteAddress(id) {
  const response = await api.delete(`/addresses/${id}`);
  return response.data;
}
