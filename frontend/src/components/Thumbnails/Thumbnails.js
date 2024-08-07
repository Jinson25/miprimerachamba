import React from "react";
import { Link } from "react-router-dom";
import StarRating from "../starCalificacion/StartRating";
import "./Thumbnails.css";

export default function Thumbnails({ libros }) {
  return (
    <section className="booklist py-8">
      <div className="container mx-auto">
        <div className="row">
          <ul className="list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {libros ? (
              libros.map((libro) => (
                <li key={libro.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={`/book/${libro.id}`}>
                    <div className="image-container">
                      <img
                        className="w-full h-48 object-cover"
                        src={libro.portadaIMG}
                        alt={libro.name}
                      />
                    </div>
                    <div className="p-4 text-center">
                      <div className="text-xl font-bold mb-2">{libro.titulo}</div>
                      <div className="stars flex justify-center mb-2">
                        <StarRating stars={libro.calificacion} />
                      </div>
                      <div className="text-gray-700">
                        <p>
                          <span className="font-semibold">Autor:</span> {libro.autor}
                        </p>
                        <p>
                          <span className="font-semibold">Código:</span> {libro.codigo}
                        </p>
                        <p>
                          <span className="font-semibold">Publicado:</span> {libro.anio}
                        </p>
                        <p>
                          <span className="font-semibold">Disponible:</span> {libro.disponibles ? "Sí" : "No"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <h1>Cargando...</h1>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
