import React, { useEffect, useState } from 'react';
import { getAllLoans, updateLoanById } from '../../services/prestamoService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoansPage = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const loansData = await getAllLoans();
        setLoans(loansData.filter(loan => !loan.returned)); // Excluir préstamos devueltos
      } catch (error) {
        console.error('Error al obtener los préstamos:', error.response ? error.response.data : error.message);
        toast.error('Error al obtener los préstamos');
      }
    };

    fetchLoans();
  }, []);

  const handleReturn = async (loanId) => {
    try {
      await updateLoanById(loanId, { endDate: new Date() });
      setLoans(loans.filter(loan => loan._id !== loanId)); // Remover el préstamo devuelto de la lista
      toast.success('Libro devuelto con éxito!');
    } catch (error) {
      console.error('Error al devolver el libro:', error.response ? error.response.data : error.message);
      toast.error('Error al devolver el libro');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Gestión de Préstamos</h1>
      <div className="overflow-x-auto">
        {loans.length === 0 ? (
          <p className="text-center text-gray-600">No hay préstamos activos. Todos los libros se encuentran en la biblioteca.</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 border-b">Libro</th>
                <th className="py-2 border-b">Usuario</th>
                <th className="py-2 border-b">Fecha de Préstamo</th>
                <th className="py-2 border-b">Fecha de Devolución</th>
                <th className="py-2 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loans.map(loan => (
                <tr key={loan._id}>
                  <td className="py-2 border-b">{loan.bookId?.titulo}</td>
                  <td className="py-2 border-b">{loan.userId?.nombre}</td>
                  <td className="py-2 border-b">{new Date(loan.startDate).toLocaleDateString()}</td>
                  <td className="py-2 border-b">{new Date(loan.endDate).toLocaleDateString()}</td>
                  <td className="py-2 border-b">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleReturn(loan._id)}
                    >
                      Devolver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LoansPage;
