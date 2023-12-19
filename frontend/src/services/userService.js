import axios from "axios";

export const getUsers = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const login = async (email, password) => {
  const { data } = await axios.post("api/v1/users/login", { email, password });
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};
export const register = async (registerData) => {
  const { data } = await axios.post("api/v1/users/register", registerData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};
export const updateProfile = async (updateData) => {
  const { data } = await axios.put("api/v1/users/updateProfile", updateData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};
export const changePassword = async (passwords) => {
  await axios.put("/api/v1/users/changePassword", passwords);
};
export const deleteUserId = async (userId) => {
  await axios.delete(`/api/v1/users/${userId}`);
};
// Obtener todos los usuarios (para el administrador)
export const getAllUsers = async () => {
  const { data } = await axios.get("/api/v1/users/");
  return data;
};

// Crear un nuevo usuario (para el administrador)
export const createUser = async (userData) => {
  const { data } = await axios.post("/api/v1/users/register", userData);
  return data;
};

// Actualizar un usuario por su ID (para el administrador)
export const updateUserById = async (userId, userData) => {
  const { data } = await axios.put(`/api/v1/users/${userId}`, userData);
  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get(`/api/v1/users/search/${searchTerm}`);
  return data;
};
// Obtener usuario actualmente logueado (si existe)
export const getCurrentUser = () => {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  }
export const logout = () => {
  localStorage.removeItem("user");
};
