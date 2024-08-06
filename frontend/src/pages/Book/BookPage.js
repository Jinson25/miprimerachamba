import React, { useEffect, useState } from "react";
import "./BookPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { getById } from "../../services/bibliotecaService";
import { createLoan } from "../../services/prestamoService";
import NotFound from "../../components/NotFound/NotFound";
import Modal from "../../components/Modal/modal"; // Importa el componente de modal

export default function BookPage() {
  const [book, setBook] = useState({});
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [cedula, setCedula] = useState('');
  const [endDate, setEndDate] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getById(id).then(setBook);
  }, [id]);

  const handleLoan = async (event) => {
    event.preventDefault();
    const loan = { bookId: id, userId: cedula, startDate: new Date(), endDate };
    try {
      await createLoan(loan);
      alert('Préstamo solicitado con éxito!');
      setShowLoanForm(false); // Cierra el modal
    } catch (error) {
      console.error('Error al solicitar préstamo:', error);
      alert('Error al solicitar préstamo.');
    }
  };

  if (!book) {
    return <NotFound message="Libro no encontrado" linkRoute="Regresa al inicio" />;
  }

  return (
    <>
      <section className='book-details'>
        <div className='container'>
          <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/")}>
            Regresar
          </button>

          <div className='book-details-content grid'>
            <div className='book-details-img'>
              <img src={book.portadaIMG} alt="cover img" />
            </div>
            <div className='book-details-info'>
              <div className='book-details-item'>
                <span className='fw-6'>Código: </span>
                <span>{book.codigo}</span>
              </div>
              <div className='book-details-item title'>
                <span className='fw-6 fs-24'>{book.titulo}</span>
              </div>
              <div className='book-details-item'>
                <span className='text-italic'>{book.autor}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Historia: </span>
                <span>{book.texto}</span>
              </div>
              <button 
                className='btn btn-primary' 
                onClick={() => setShowLoanForm(true)}
              >
                Pedir prestado
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Préstamo */}
      <Modal isOpen={showLoanForm} onClose={() => setShowLoanForm(false)}>
        <h3 className="text-xl font-bold mb-4">Solicitar Préstamo</h3>
        <form onSubmit={handleLoan} className="space-y-4">
          <div>
            <label className="block text-gray-700">Cédula:</label>
            <input
              type='text'
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Fecha de Devolución:</label>
            <input
              type='date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Solicitar Préstamo</button>
            <button type='button' onClick={() => setShowLoanForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancelar</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
