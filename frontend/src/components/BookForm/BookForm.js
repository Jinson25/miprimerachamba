import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { create, getById, updateById } from "../../services/bibliotecaService";

const BookForm = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    anio: "",
    descripcion: "",
    calificacion: 3,
    portadaIMG: "",
    texto: "",
    ediciones: "",
    //categoria: [],
  });

  useEffect(() => {
    if (bookId) {
      const loadBookData = async () => {
        try {
          const bookData = await getById(bookId);
          setFormData(bookData);
        } catch (error) {
          console.error("Error cargando datos del libro:", error);
        }
      };
      loadBookData();
    }
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (bookId) {
        await updateById(bookId, formData);
        console.log("Libro actualizado:", formData);
      } else {
        const createdBook = await create(formData);
        console.log("Libro creado:", createdBook);
      }

      navigate("/admin/books");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-4">
      <h2>{bookId ? "Editar Libro" : "Crear Nuevo Libro"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="autor" className="form-label">
            Autor
          </label>
          <input
            type="text"
            className="form-control"
            id="autor"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="anio" className="form-label">
            Año
          </label>
          <input
            type="text"
            className="form-control"
            id="anio"
            name="anio"
            value={formData.anio}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="calificacion" className="form-label">
            Calificación
          </label>
          <input
            type="number"
            className="form-control"
            id="calificacion"
            name="calificacion"
            value={formData.calificacion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="portadaIMG" className="form-label">
            Portada
          </label>
          <input
            type="text"
            className="form-control"
            id="portadaIMG"
            name="portadaIMG"
            value={formData.portadaIMG}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="texto" className="form-label">
            Historia:
          </label>
          <textarea
            type="text"
            className="form-control"
            id="texto"
            name="texto"
            value={formData.texto}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
            <label htmlFor="ediciones" className="form-label">
                Ediciones
            </label>
            <input
                type="text"
                className="form-control"
                id="ediciones"
                name="ediciones"
                value={formData.ediciones}
                onChange={handleChange}
            />
        </div>


        {/* Agrega los demás campos aquí */}
        <button type="submit" className="btn btn-primary">
          {bookId ? "Guardar Cambios" : "Crear Libro"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
/* 
     <div className="mb-3">
          <label htmlFor="categorias" className="form-label">
            Categorías
          </label>
          <select
            multiple
            className="form-control"
            id="categorias"
            name="categorias"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="Aventura">Aventura</option>
            <option value="Romance">Romance</option>
            <option value="Ciencia ficción">Ciencia ficción</option>
            <option value="Misterio">Misterio</option>
          </select>
        </div>*/