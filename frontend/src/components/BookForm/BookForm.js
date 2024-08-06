import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { create, getById, updateById } from "../../services/bibliotecaService";

const BookForm = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [formData, setFormData] = useState({
    codigo: "",
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "calificacion") {
      if (newValue > 5) {
        newValue = 5;
      } else if (newValue < 1) {
        newValue = 1;
      }
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  return (
    <div className="container mt-4">
      <h2>{bookId ? "Editar Libro" : "Crear Nuevo Libro"}</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <div className="mb-3">
          <label htmlFor="Codigo" className="form-label">
            Codigo del Libro
          </label>
          <input
            type="text"
            className="form-control"
            id="codigo"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex flex-wrap">
          <div className="flex-fill p-2">
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
          </div>
          <div className="flex-fill p-2">
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
                onBlur={handleBlur}
                min="1"
                max="5"
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
            <div className="mb-3">
              <label htmlFor="texto" className="form-label">
                Historia:
              </label>
              <textarea
                className="form-control"
                id="texto"
                name="texto"
                value={formData.texto}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {bookId ? "Guardar Cambios" : "Crear Libro"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
