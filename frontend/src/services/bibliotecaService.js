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
