import axios from 'axios';

const API_URL = '/api/v1/prestamo/loans';

// Obtener todos los préstamos
export const getAllLoans = async () => {
  const { data } = await axios.get(API_URL);
  return data.filter(loan => !loan.returned); // Excluir préstamos devueltos
};

// Obtener un préstamo por ID
export const getLoanById = async (loanId) => {
  const { data } = await axios.get(`${API_URL}/${loanId}`);
  return data;
};

// Crear un nuevo préstamo
export const createLoan = async (loan) => {
  try {
    const { data } = await axios.post(API_URL, loan);
    return data;
  } catch (error) {
    console.error('Error en createLoan:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Actualizar un préstamo por ID
export const updateLoanById = async (loanId, loan) => {
  try {
    const { data } = await axios.put(`${API_URL}/${loanId}`, loan);
    return data;
  } catch (error) {
    console.error('Error en updateLoanById:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Eliminar un préstamo por ID
export const deleteLoanById = async (loanId) => {
  await axios.delete(`${API_URL}/${loanId}`);
};

// Eliminar todos los préstamos (opcional)
export const deleteAllLoans = async () => {
  await axios.delete(API_URL);
};
