import api from "../api/axios";
import { addUserToMirror } from "./localStorageDB";

// Backend ko register request bhejta hai + localStorage mirror mein bhi save karta hai
export async function registerUser({ name, email, password }) {
  const response = await api.post("/auth/register", { name, email, password });
  const { user } = response.data;

  // Mirror: localStorage mein bhi record rakho (backend user na bheje to bhi crash na ho)
  if (user) {
    addUserToMirror(user);
  }

  return response.data;
}

// Backend ko login request bhejta hai + localStorage mirror update karta hai
export async function loginUser({ email, password }) {
  const response = await api.post("/auth/login", { email, password });
  const { user, token } = response.data;

  // Mirror: localStorage mein current session save karo
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("accessToken", token);
  addUserToMirror(user);

  return response.data;
}