import api from "../api/axios";


// Get User Profile
// (shared api instance accessToken khud attach kar deta hai, baaki services ki tarah)

export const getProfile = async () => {

  const response = await api.get("/user/profile");

  return response.data;

};



// Update User Profile

export const updateProfile = async (userData) => {

  const response = await api.put("/user/profile", userData);

  return response.data;

};



// Change Password

export const changePassword = async (passwordData) => {

  const response = await api.put("/user/change-password", passwordData);

  return response.data;

};