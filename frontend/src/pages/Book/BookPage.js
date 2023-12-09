import React, { useEffect, useState } from "react";
import "./BookPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { getById } from "../../services/bibliotecaService";
import NotFound from "../../components/NotFound/NotFound";


export default function BookPage() {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getById(id).then(setBook);
  }, [id]);

  if (!book) {
    return <NotFound message="Libros no encontrados" linkRoute="Regresa al inicio" />;
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
