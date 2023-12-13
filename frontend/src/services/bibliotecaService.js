import axios from "axios";

export const getAll = async () => {
  const { data } = await axios.get("/api/v1/biblioteca");
  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get(`/api/v1/biblioteca/search/${searchTerm}`);
  return data;
};

export const getById = async (bookId) => {
  const { data } = await axios.get(`/api/v1/biblioteca/${bookId}`);
  return data;
};
export async function deleteById(bookId) {
  await axios.delete(`/api/v1/biblioteca/${bookId}`);
}
export async function create(book) {
  const { data } = await axios.post(`/api/v1/biblioteca/`, book);
  return data;
}
export async function updateById(bookId, book) {
  const { data } = await axios.put(`/api/v1/biblioteca/${bookId}`, book);
  return data;
}

export async function deleteAll() {
  await axios.delete(`/api/v1/biblioteca/`);
}
